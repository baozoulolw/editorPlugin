import { setWorker, initWorker } from './worker'
import { regTailwind } from '../tailwindcss/tailwindcss'
import { registerTheme } from '../theme'
import { getSettings, setSettings, setLoading } from '../utils'
import editorConfig from '../../editor.config.js'
import { registerDts } from '../dts'
import { registerCopilot } from '../copilot/index.js'
import { registerLanguage } from '../language/index.js'
import { unsafeWindow } from "$"
import { getFontName } from '../font/index.js'
import formatBtn from '../pages/tools/formatBtn.vue'

let monacoCreate = () => { }
/**
 * @description:  初始化
 * @Date: 2024-10-29 22:42:51
 * @Author: 王浩然
 * @param {*} safeMonaco
 * @return {*}
 */
const init = async safeMonaco => {
  await initBefore(safeMonaco)
  monacoCreate = safeMonaco.editor.create
  safeMonaco.editor.create = create
  await initAfter(safeMonaco)
  monaco.editor.onWillDisposeModel(editorDispose);
  setLoading(false)
}

const initBefore = async safeMonaco => {
  await registerLanguage()
  await initWorker()
  await registerTheme()
  setWorker()
  await registerDts()
}

const initAfter = async safeMonaco => {
  registerCopilot()
  regTailwind(safeMonaco)
  //preVieWEditor()
}


export const initSettings = () => {
  const settings = getSettings()
  setSettings(_.merge({}, editorConfig, settings))
}

const editorDispose = () => {
  if (_.isFunction(unsafeWindow.copilotDispose)) {
    unsafeWindow.copilotDispose()
  }
}

const create = function (dom, option, ...params) {
  setWorker()
  let { editorConfig, editorConfig: { theme, fontFamily } } = getSettings()
  const { language } = option
  let fontObj = getFontName(fontFamily)
  const editor = monacoCreate(dom, {
    ...option,
    ...editorConfig,
    ...fontObj,
    //theme: 'Monokai5',
    theme,
    language: option.language === 'css' ? 'sass' : option.language,
  }, ...params)
  //setWorker()
  //setFeature(fontObj)
  addTools(dom)
  return editor
}

const preVieWEditor = () => {
  let types = ['json', 'html', 'css', 'javascript']
  types.forEach(async type => {
    let editor = unsafeWindow.monaco.editor.create(document.createElement('div'), {
      language: type
    })
    editor.dispose()
  })
}

const addTools = (dom) => {
  let parent = dom.parentNode
  const div = document.createElement('div')
  parent.insertBefore(div, dom)
  const Vue = unsafeWindow.Vue
  new Vue({
    render: h => h(formatBtn)
  }).$mount(div)
}


export {
  init
}