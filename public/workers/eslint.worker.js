
//importScripts('http://127.0.0.1:5689/js/linter.min.js')
//importScripts('http://127.0.0.1:5689/js/eslint.min.js')
importScripts('http://127.0.0.1:5689/js/index.bundle.js')
const severityMap = {
  2: 8, // 2 for ESLint is error
  1: 4, // 1 for ESLint is warning
};
const config = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  extends: "eslint:recommended",
  globals: {
    define: 'readonly', 
    _: true,
    zzUtil: true,
    Vue: true,
    Big: true,
    dayjs: true,
    
  },
  rules: {
    // 与 Prettier singleQuote: true 匹配
    "quotes": ["error", "single", {
      "avoidEscape": true, // 允许使用双引号包含单引号
      "allowTemplateLiterals": true // 允许模板字符串
    }],

    // 与 Prettier semi: true 匹配
    "semi": ["error", "always"],

    // 与 Prettier tabWidth: 2, useTabs: false 匹配
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "VariableDeclarator": "first",
      "outerIIFEBody": 0,
      "MemberExpression": 1,
      "FunctionDeclaration": { "parameters": "first" },
      "FunctionExpression": { "parameters": "first" },
      "CallExpression": { "arguments": "first" }
    }],

    // 与 Prettier trailingComma: 'es5' 匹配
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore" // ES5不支持函数参数尾逗号
    }],

    // 与 Prettier bracketSpacing: true 匹配
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"], // 数组括号内不加空格
    "computed-property-spacing": ["error", "never"], // 计算属性内不加空格

    // 与 Prettier arrowParens: "avoid" 匹配
    "arrow-parens": ["error", "as-needed", {
      "requireForBlockBody": false
    }],

    // 与 Prettier endOfLine: 'lf' 匹配
    "linebreak-style": ["error", "unix"],

    // 与 Prettier printWidth: 80 匹配
    "max-len": ["error", {
      "code": 100,
      "tabWidth": 2,
      "comments": 100,
      "ignoreComments": false,
      "ignoreTrailingComments": true,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }],

    // 其他匹配规则
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "keyword-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "space-infix-ops": ["error"],
    "block-spacing": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "template-curly-spacing": ["error", "never"],
    "rest-spread-spacing": ["error", "never"],

    // 代码质量规则（不与格式化冲突）
    "no-console": "warn",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-undef": "warn",
    "eqeqeq": ["error", "always"],
    "no-var": "error",
    "prefer-const": "error",
    "no-else-return": "error",
    "no-empty-function": "off",
    "no-extra-bind": "error",
    "no-implicit-coercion": "error",

    // // 新增ES2022+规则支持
    // "class-methods-use-this": "warn",
    // "no-class-assign": "error",
    // "no-constructor-return": "error",
    // "no-duplicate-imports": "error",
    // "no-new-native-nonconstructor": "error",
    // "no-promise-executor-return": "error",
    // "no-unreachable-loop": "error",
    // "no-useless-backreference": "error",
    // "require-atomic-updates": "error"
  }
};
//const linter = new eslint.Linter();
self.addEventListener('message', function (e) {
  const { code, version } = e.data;
  if (!code) {
    self.postMessage({ markers: [], version });
    return;
  }
  try {
    // console.log({ ...linter.config, ...config })
    const errs = linter.esLinter.verify(code, { ...linter.config, ...config });
    const ruleDefines = linter.esLinter.getRules();
    //const errs = linter.verify(code, config);
    // const errs = eslint.verify(code, config);
    // console.log(errs)
    const markers = errs.map(err => ({
      // code: {
      //   value: err.ruleId || 'eslint',
      //   target: err.ruleId ? `https://eslint.org/docs/rules/${err.ruleId}` : ''
      // },
      code: {
        value: err.ruleId,
        target: ruleDefines.get(err.ruleId).meta.docs.url,
      },
      startLineNumber: err.line,
      endLineNumber: err.endLine || err.line,
      startColumn: err.column,
      endColumn: err.endColumn || (err.column + 1),
      message: err.message,
      // 设置错误的等级，此处ESLint与monaco的存在差异，做一层映射
      severity: severityMap[err.severity] || 4,
      source: 'ESLint',
    }));

    // 发回主进程
    self.postMessage({ markers, version });
  } catch (error) {
    self.postMessage({ markers: [], version, error: error.message });
  }
});