import { configureMonacoTailwindcss, tailwindcssData } from 'monaco-tailwindcss'
import tailwindConfig from '../../tailwind.config'
import { unsafeWindow } from "$"

let disposeTailwind
const regTailwind = () => {
  unsafeWindow.monaco.languages.css.cssDefaults.setOptions({
    data: {
      dataProviders: {
        tailwindcssData
      }
    }
  })

  const { dispose, setTailwindConfig } = configureMonacoTailwindcss(unsafeWindow.monaco, {
    tailwindConfig,
    languageSelector:['html','css']
  })
  disposeTailwind = dispose
}

const refreshTailwind = () => {
  if (disposeTailwind) {
    disposeTailwind()
  }
  regTailwind()
}
export {
  regTailwind,
  refreshTailwind
}