import { unsafeWindow } from "$"
import { loadWASM } from "onigasm";

export let hasGetWorkUrl = false
export const changeStatus = (flag) => {
  hasGetWorkUrl = flag
}
const workerMap = new Map()

export const initWorker = async () => {
  await loadWASM(`${import.meta.env.VITE_ALI_OSS}/onigasm/onigasm.wasm`)
  let baseUrl = `${import.meta.env.VITE_ALI_OSS}/worker/`
  let workers = [
    { fileName: 'html.worker.bundle.js', key: 'html' },
    { fileName: 'ts.worker.bundle.js', key: 'ts' },
    { fileName: 'json.worker.bundle.js', key: 'json' },
    { fileName: 'tailwindcss.worker.js', key: 'tailwindcss' },
    { fileName: 'editor.worker.bundle.js', key: 'editor' },
    { fileName: 'css.worker.bundle.js', key: 'css' }]
  await Promise.all(workers.map(async ({ fileName, key }) => {
    const text = await (await fetch(`${baseUrl}${fileName}`)).text()
    const blob = new Blob([text], { type: 'application/javascript;module' });
    // 生成一个URL
    const workerUrl = URL.createObjectURL(blob);
    workerMap.set(key, new Worker(workerUrl, { type: 'module' }))
  }))
}

export const setWorker = async (monaco) => {
  unsafeWindow.MonacoEnvironment = {
    getWorker(_, label) {
      console.log(label)
      hasGetWorkUrl = true
      switch (label) {
        case "css":
        case "less":
        case "scss":
          return workerMap.get('css')
        case "handlebars":
        case "html":
        case "razor":
          return workerMap.get('html')
        case "json":
          return workerMap.get('json')
        case "javascript":
        case "typescript":
          return workerMap.get('ts')
        case "tailwindcss":
          return workerMap.get('tailwindcss')
        default:
          return workerMap.get('editor')
      }
    },
  };
}

