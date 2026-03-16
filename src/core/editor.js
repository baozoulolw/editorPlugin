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
import { register } from "monaco-editor-annotation";
import { registerCommand } from '../command/index.js'
import { initVimMode } from 'monaco-vim'
import { emmetHTML } from 'emmet-monaco-es';
import { registerLint } from '../lint/index.js'
import { registerEslint } from '../lint/eslint/index.js'

let monacoCreate = () => { }
const monacoCache = {}
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
let updateOption
const initBefore = async safeMonaco => {
  const { annotationConfig: { author } } = getSettings()
  const regis = register(safeMonaco, {
    variable: {
      author
    }
  })
  //console.log(regis.updateOptions)
  //updateOption = updateOptions
  await registerLanguage(safeMonaco)
  await initWorker()
  await registerTheme()
  setWorker()
  await registerDts()
}

const initAfter = async safeMonaco => {
  //registerCopilot()
  regTailwind(safeMonaco)
  emmetHTML(safeMonaco)
  registerLint(safeMonaco)
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
  let { editorConfig, editorConfig: { theme, fontFamily }, useVim, annotationConfig: { author } } = getSettings()
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
  // addTools(dom)
  registerCommand(editor)
  if (useVim) {
    if (unsafeWindow.vimMode) {
      unsafeWindow.vimMode.dispose()
    }
    unsafeWindow.vimMode = initVimMode(editor)
  }
  if (['javascript', 'css'].includes(language)) {
    // if (monacoCache[language]) {
    //   editor.restoreViewState(monacoCache[language])
    // }
    // const saveView = _.debounce(() => {
    //   monacoCache[language] = editor.saveViewState()
    // }, 500)
    // const actions = ['onDidChangeCursorPosition', 'onDidChangeModelContent']
    // actions.forEach(action => {
    //   editor[action](saveView)
    // })
  }
  registerCopilot(unsafeWindow.monaco, editor, option.language === 'css' ? 'sass' : option.language)
  // updateOption({
  //   variable: {
  //     author
  //   }
  // })
  return editor
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