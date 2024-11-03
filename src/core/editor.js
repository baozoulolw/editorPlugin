import { config, themes, grammars } from "./config"
import LanguageProvider from "./languageProvider"
import ThemeProvider from "./themeProvider"

const init = async monaco => {
  //injectMonacoLoader()
  const language = new LanguageProvider({
    monaco,
    wasm: config.wasm,
    grammars: grammars,
  })
  await language.loadRegistry();

  let themeProvider = new ThemeProvider({
    monaco: monaco,
    registry: language.getRegistry(),
    themes: themes,
  });

  let create = monaco.editor.create
  await themeProvider.setTheme('self');
  monaco.editor.create = (container, options) => {
    return create(container, {
      ...options,
      //language: 'vue',
      theme: 'self'
    })
  }
}

export async function injectMonacoLoader() {
  let vs = 'https://unpkg.com/monaco-editor@0.50.0/min/vs'
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = vs + `/loader.js`;
    document.body.appendChild(script);
    script.onload = () => {
      window.require.config({
        paths: { vs },
      });
      resolve('');
    };

    script.onerror = (err) => {
      console.error('Inject monaco loader failed');
      reject(err);
    };
  });
}

export {
  init
}
