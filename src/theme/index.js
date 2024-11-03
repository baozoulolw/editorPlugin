import { unsafeWindow } from "$"
const { _ } = unsafeWindow
import { getSettings, setSettings } from "../utils"
import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import { codeThemeList } from './themeList'
import {
  monacoEditorInnerLanguages,
  scopeNameMap,
  tmGrammarJsonMap
} from './constants.js'
import { hasGetWorkUrl, changeStatus } from "../core/worker/index.js"
import { refreshTailwind } from "../tailwindcss/tailwindcss.js"

export const registerTheme = async (monaco) => {
  unsafeWindow.codeThemes = codeThemeList
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
  let themeItem = themes.find(i => i.themeName === theme)
  if (themeItem.out) return
  if (themeItem.loaded && themeItem.cache) return
  let editor = unsafeWindow.monaco.editor;
  const response = await fetch(`${import.meta.env.VITE_ALI_OSS}/theme/${themeItem.group}/${themeItem.path}`);
  if (response.ok) {
    const json = await response.json()
    editor.defineTheme(theme, json)
    themeItem.loaded = true
    themeItem.cache = json
  }
}

