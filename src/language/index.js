import { unsafeWindow } from "$"
import { vueLan } from "./vueLanguage"

export const registerLanguage = async() => {
  // unsafeWindow.monaco.languages.register(vueLan)
  // unsafeWindow.monaco.languages.setMonarchTokensProvider(vueLan.id, vueLan.language);
  // unsafeWindow.monaco.languages.setLanguageConfiguration(vueLan.id, vueLan.conf);
}