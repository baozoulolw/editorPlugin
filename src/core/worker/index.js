import { unsafeWindow } from "$"


const workerType = 'url'

const workerMap = new Map()

export const initWorker = async () => {
  let baseUrl = `${import.meta.env.VITE_ALI_OSS}/workers/`
  let workers = [
    { fileName: 'html.worker.bundle.js', key: 'html' },
    { fileName: 'ts.worker.bundle.js', key: 'ts' },
    { fileName: 'json.worker.bundle.js', key: 'json' },
    { fileName: 'tailwindcss.worker.js', key: 'tailwindcss' },
    { fileName: 'editor.worker.bundle.js', key: 'editor' },
    { fileName: 'css.worker.bundle.js', key: 'css' },
    { fileName: 'vue.worker.js', key: 'vue' },
  ]
  await Promise.all(workers.map(async ({ fileName, key }) => {
    const text = await (await fetch(`${baseUrl}${fileName}`)).text()
    const blob = new Blob([text], { type: 'application/javascript;module' });
    // 生成一个URL
    const workerUrl = URL.createObjectURL(blob);
    if(workerType === 'url') {
      workerMap.set(key,workerUrl)
    }else{
      workerMap.set(key, new Worker(workerUrl, { type: 'module' }))
    }
  }))
}

export const setWorker = async (monaco) => {
  if(workerType === 'worker') {
    await setIsWorker()
  }else{
    await setIsUrl()
  }
}

const setIsWorker = async () => {
  unsafeWindow.MonacoEnvironment = {
    getWorker(_, label) {
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

const setIsUrl = async() => {
  unsafeWindow.MonacoEnvironment = {
    getWorkerUrl(_, label) {
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



