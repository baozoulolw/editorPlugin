import { unsafeWindow } from "$"
import { vueLan } from "./vueLanguage"
import { registerJavaScriptCompletion } from "./javascript"

export const registerLanguage = async(monaco) => {
  // 注册Vue语言
  // unsafeWindow.monaco.languages.register(vueLan)
  // unsafeWindow.monaco.languages.setMonarchTokensProvider(vueLan.id, vueLan.language);
  // unsafeWindow.monaco.languages.setLanguageConfiguration(vueLan.id, vueLan.conf);
  
  // 注册JavaScript语言补全
  registerJavaScriptCompletion(monaco)
}