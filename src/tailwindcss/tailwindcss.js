import { configureMonacoTailwindcss, tailwindcssData } from 'monaco-tailwindcss'
import tailwindConfig from '../../tailwind.config'
const regTailwind = (monaco) => {
  monaco.languages.css.cssDefaults.setOptions({
    data: {
      dataProviders: {
        tailwindcssData
      }
    }
  })

  configureMonacoTailwindcss(monaco, {
    tailwindConfig
  })
}

export {
  regTailwind
}