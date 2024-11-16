import { unsafeWindow } from "$"
import { getSettings, setLoading } from "../utils"
import { codeThemeList } from './themeList'
import { shikiToMonaco } from '@shikijs/monaco'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'



const langs = ['javascript', 'scss', 'html', 'json']
const options = {
  themes: [],
  langs: langs.map(lang => (() => import(`${import.meta.env.VITE_ALI_OSS}/langs/${lang}.mjs`))),
  engine: createOnigurumaEngine(import(`${import.meta.env.VITE_ALI_OSS}/wasm/wasm.mjs`))
}
let highlighter
let isFirst = true


export const registerTheme = async (monaco) => {
  unsafeWindow.codeThemes = codeThemeList.filter(i => !i.out)
  //await initShiki()
  await defineTheme()
}

const defineTheme = async () => {
  const { editorConfig: { theme = 'vs' } } = getSettings()
  await regTheme(theme)
}

/**
 * 注册主题
 * @returns {Promise<void>}
 */
export const regTheme = async (theme) => {
  setLoading()
  if (['vs', 'vs-dark'].includes(theme)) return
  let themes = unsafeWindow.codeThemes
  const themeItem = themes.flatMap(i => i.children).find(i => i.value === theme)
  if (!themeItem) return
  const { cache, defaultTheme = false, load, parent, value, label } = themeItem
  if (defaultTheme) return
  const themeJson = cache ? cache : await (await fetch(`${import.meta.env.VITE_ALI_OSS}/themes/${parent}/${label}.json`)).json()
  let lighter = highlighter ? highlighter : await createHighlighterCore(options)
  highlighter = lighter
  await lighter.loadTheme({
    ...themeJson,
    name: value
  })
  shikiToMonaco(lighter, unsafeWindow.monaco)
  themeItem.cache = themeJson
  if(!isFirst){
    await new Promise(resolve => setTimeout(resolve, 5000))
    isFirst = false
  }
  setLoading(false)
}

