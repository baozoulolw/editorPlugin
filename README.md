# Monaco Editor 插件 - Prettier 和 ESLint 集成

这个项目为 Monaco Editor 添加了 Prettier 代码格式化和 ESLint 代码检查功能。

## 功能特点

- **Prettier 代码格式化**：支持 JavaScript、SCSS 和 JSON 语言
- **ESLint 代码检查**：实时检查 JavaScript 代码中的问题
- **格式化按钮**：在编辑器右上角提供一个方便的格式化按钮
- **快捷键支持**：使用 `Ctrl+Shift+F`（Mac 上使用 `Cmd+Shift+F`）快速格式化代码
- **右键菜单**：通过右键菜单访问格式化功能

## 安装

使用 pnpm 安装依赖：

```bash
pnpm add -D prettier-standalone eslint eslint-plugin-prettier monaco-editor
```

## 使用方法

### 格式化代码

有三种方式可以格式化代码：

1. **使用快捷键**：`Ctrl+Shift+F`（Mac 上使用 `Cmd+Shift+F`）
2. **点击格式化按钮**：编辑器右上角的格式化按钮
3. **使用右键菜单**：在编辑器中右键点击，选择"使用 Prettier 格式化文档"

### ESLint 检查

ESLint 检查会在编辑 JavaScript 文件时自动运行，错误和警告会以下划线的形式显示在编辑器中。

## 配置

### Prettier 配置

可以通过修改 `.prettierrc.js` 文件来自定义 Prettier 的格式化规则：

```js
module.exports = {
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.scss',
      options: {
        parser: 'css'
      }
    },
    {
      files: '*.js',
      options: {
        parser: 'babel'
      }
    },
    {
      files: '*.json',
      options: {
        parser: 'json'
      }
    }
  ]
};
```

### ESLint 配置

可以通过修改 `.eslintrc.js` 文件来自定义 ESLint 的检查规则：

```js
module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'semi': ['warn', 'never'],
    'quotes': ['warn', 'single'],
    'eqeqeq': 'warn'
  }
};
```

## 部署 ESLint Worker

ESLint Worker 需要部署到 OSS 上，可以使用以下命令：

```bash
node scripts/deploy-workers.js
```

请确保在 `scripts/deploy-workers.js` 中配置了正确的 OSS 凭证。

## 注意事项

- ESLint Worker 需要部署到 OSS 上，并确保 `baseUrl` 配置正确
- 如果遇到格式化或 ESLint 检查不工作的问题，请检查控制台是否有错误信息
