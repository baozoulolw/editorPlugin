

// Monaco Editor支持的语言
export const supportLanguage = {
  css: 'css',
  less: 'less',
  scss: 'scss',
  sass: 'scss',
  stylus: 'css',
  postcss: 'css',
  html: 'html',
  pug: 'pug',
  javascript: 'javascript',
  babel: 'javascript',
  typescript: 'typescript',
  coffeescript: 'coffeescript',
  vue:'vue',
  vue2: 'html',
  vue3: 'html',
  livescript: 'javascript',
  json: 'json'
}

// 支持美化的语言
export const formatterParserMap = {
  css: 'css',
  scss: 'scss',
  less: 'less',
  postcss: 'css',
  html: 'html',
  javascript: 'babel',
  babel: 'babel',
  typescript: 'typescript',
  vue2: 'html',
  vue3: 'html'
}

// 支持使用es6模块语法
export const supportESModuleMap = {
  javascript: true,
  typescript: true,
  coffeescript: true,
  vue:true,
  vue2: true,
  vue3: true
}

// monaco editor包含的语言，可通过vue.config.js的MonacoWebpackPlugin插件进行配置
export const monacoEditorInnerLanguages = [
  'css',
  'vue',
  'html',
  'javascript',
  'less',
  'pug',
  'scss',
  'typescript',
  'coffee',
]

// 语言id到作用域名称的映射
export const scopeNameMap = {
  html: 'text.html.basic',
  vue: 'source.vue',
  pug: 'text.pug',
  css: 'source.css',
  less: 'source.css.less',
  scss: 'source.css.scss',
  sass: 'source.sassdoc',
  typescript: 'source.ts',
  javascript: 'source.js',
  javascriptreact: 'source.js.jsx',
  coffeescript: 'source.coffee',
  json: 'source.json'
}

// 作用域名称到语法文件的映射
export const tmGrammarJsonMap = {
  //'text.html.basic': 'html.tmLanguage.json',
  'text.html.basic': 'html.tmLanguage.json',
  'source.vue': 'vue.tmLanguage.json',
  'text.pug': 'pug.tmLanguage.json',
  'source.css': 'css.tmLanguage.json',
  'source.css.less': 'less.tmLanguage.json',
  'source.less': 'less.tmLanguage.json',
  'source.css.scss': 'scss.tmLanguage.json',
  'source.sass': 'scss.tmLanguage.json',
  'source.sassdoc': 'sassdoc.tmLanguage.json',
  'source.stylus': 'css.tmLanguage.json',
  'source.ts': 'TypeScript.tmLanguage.json',
  'source.js': 'JavaScript.tmLanguage.json',
  'source.js.jsx': 'JavaScriptReact.tmLanguage.json',
  'source.coffee': 'coffeescript.tmLanguage.json',
  'source.js.regexp': {
    format: 'plist',
    path: 'Regular Expressions (JavaScript).tmLanguage'
  },
  'source.json': 'JSON.tmLanguage.json'
}
