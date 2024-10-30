import { unsafeWindow } from "$"

const dts = ['lodash', 'Big', 'zzUtil', 'jquery', 'page', 'dayjs']
export const registerDts = async () => {
  dts.forEach(i => useDTS(unsafeWindow.monaco, i))
}

const useDTS = async (monaco, type) => {
  const response = await fetch(`${import.meta.env.VITE_ALI_OSS}/type/${type}.d.ts`);
  const text = await response.text();
  const libUrl = `ts:fileName/${type}.d.ts`
  monaco.languages.typescript.javascriptDefaults.addExtraLib(text, libUrl);
  monaco.editor.createModel(text, 'typescript', monaco.Uri.parse(libUrl))
}