import { createHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'
import { setWorker, initWorker } from '../work'
import { configureMonacoTailwindcss, tailwindcssData } from 'monaco-tailwindcss'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const jsEngine = createJavaScriptRegexEngine()

const initShiki = async monaco => {
  const theme = await (await fetch('https://baozoulolw.oss-cn-chengdu.aliyuncs.com/codeSet/data/onigasm/slack-dark.json')).json()
  const javascript = await (await fetch('https://baozoulolw.oss-cn-chengdu.aliyuncs.com/codeSet/data/grammars/JavaScript.tmLanguage.json')).json()
  const vue = await (await fetch('https://baozoulolw.oss-cn-chengdu.aliyuncs.com/codeSet/data/grammars/vue.tmLanguage.json')).json()
  await initWorker()
  setWorker()
  const highlighter = await createHighlighter(
    {
      langs: [
        'javascript',
        'typescript',
        'html',
        'json'
      ],
      engine: jsEngine
    }
  )
  await highlighter.loadTheme({
    ...theme,
    name: 'self'
  })
  shikiToMonaco(highlighter, monaco)
  monaco.languages.css.cssDefaults.setOptions({
    data: {
      dataProviders: {
        tailwindcssData
      }
    }
  })
  
  configureMonacoTailwindcss(monaco)
  //await initWorker(monaco)
  let create = monaco.editor.create
  monaco.editor.create = (container, options) => {
    setWorker()
    return create(container, {
      ...options,
      //language: 'vue',
      theme: 'self',
      fontSize: 16,
    })
  }
  loopCreate(monaco)
}

const loopCreate = (monaco) => {
  ['typescript', 'html','javascript'].forEach(async (lang) => {
   const editor = monaco.editor.create(document.createElement('div'), {
    language: lang
   })
   //editor.dispose()
  })
}

export {
  initShiki
}