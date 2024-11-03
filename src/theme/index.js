import { unsafeWindow } from "$"
const { _ } = unsafeWindow
import { getSettings, setSettings } from "../utils"
import { codeThemeList } from './themeList'
import { shikiToMonaco } from '@shikijs/monaco'
import { createHighlighter } from 'shiki'


let highlighter

export const registerTheme = async (monaco) => {
  unsafeWindow.codeThemes = codeThemeList
  await initShiki()
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
  let themes = unsafeWindow.codeThemes
  let themeItem = themes.find(i => i.name === theme)
  if (themeItem.out) return
  if (themeItem.loaded && themeItem.cache) return
  const response = await fetch(`${import.meta.env.VITE_ALI_OSS}/themes/${themeItem.file}`);
  if (response.ok) {
    const json = await response.json()
    await highlighter.loadTheme({
      ...json,
      name: theme
    })
    //shikiToMonaco(highlighter, unsafeWindow.monaco)
    themeItem.loaded = true
    themeItem.cache = json
  }
}

const initShiki = async () => {
  const monaco = unsafeWindow.monaco
  highlighter = await createHighlighter({
    themes:['vitesse-dark'],
    langs: [
      'javascript',
      'typescript',
      'html',
      'css',
      'sass',
      'scss',
      'json'
    ],
  })
  await defineTheme()
  shikiToMonaco(highlighter, monaco)
}

