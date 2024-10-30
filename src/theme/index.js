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
import { regTailwind } from "../tailwindcss/tailwindcss.js"

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

/**
 * @description: 创建语法关联
 * @Date: 2024-10-30 11:21:09
 * @Author: 王浩然
 * @return {*}
 */
export const setThemeToLanguage = async (languageId, monaco,editor) => {
  // vue单文件使用html语法高亮
  languageId = ['vue2', 'vue3', 'vue'].includes(languageId) ? 'vue' : languageId
  if (!scopeNameMap[languageId]) {
    return
  }
  languageId = languageId === 'css' ? 'scss' : languageId
  languageId = languageId === 'html' ? 'vue' : languageId
  console.log(languageId)
  // 语言id到作用域名称的映射
  const grammars = new Map()
  grammars.set(languageId, scopeNameMap[languageId])
  // 创建一个注册表，可以从作用域名称创建语法
  const registry = new Registry({
    getGrammarDefinition: async scopeName => {
      let jsonMap = tmGrammarJsonMap[scopeName]
      if (!jsonMap) {
        return null
      }
      let format = 'json'
      let path = jsonMap
      if (typeof jsonMap !== 'string') {
        format = jsonMap.format
        path = jsonMap.path
      }
      let text = await (await fetch(`${import.meta.env.VITE_ALI_OSS}/grammars/${path}`)).text()
      return {
        format,
        content: text
      }
    }
  })
  // 注册语言
  if (!monacoEditorInnerLanguages.includes(languageId)) {
    monaco.languages.register({ id: languageId })
  }
  await wireTmGrammars(monaco, registry, grammars)
  //regTailwind(monaco)
}

