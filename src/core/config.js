const base = `https://unpkg.com/monaco-editor-with-textmate@1.0.0/static/`;

const config = {
  wasm: 'https://unpkg.com/vscode-oniguruma@1.7.0/release/onig.wasm'
}

const grammars = {
  javascript: {
    scopeName: 'source.js',
    tm: `${base}textmate/javascript.tmLanguage.json`,
    cfg: `${base}configuration/javascriptConfiguration.json`,
  },
  html: {
    scopeName: 'text.html.basic',
    tm: `${base}textmate/html.tmLanguage.json`,
    cfg: `${base}configuration/htmlConfiguration.json`,
  },
}

const themes = {
  'self':'https://unpkg.com/monaco-editor-with-textmate@1.0.0/static/theme/dracula.json'
}

export {
  config,
  grammars,
  themes
}