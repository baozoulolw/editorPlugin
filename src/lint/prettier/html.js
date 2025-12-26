import prettier from 'prettier/standalone'
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as parserHtml from "prettier/parser-html";
import * as parserPostCSS from "prettier/parser-postcss";
export const lint = async (text) => {
  const formatted = await prettier.format(text, {
    parser: 'babel',
    semi: true,
    plugins: [prettierPluginEstree, parserBabel, parserHtml, parserPostCSS],
    singleQuote: true,
    trailingComma: 'es5', // 控制多行结构中的尾逗号
    bracketSpacing: true,
    jsxBracketSameLine: true,
    semi: true,
    useTabs: false,
    tabWidth: 2,
    printWidth: 100,
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'css',
    vueIndentScriptAndStyle: false,
    endOfLine: 'lf',
    embeddedLanguageFormatting: "auto", // 是否格式化嵌入在其他文件中的代码（如 HTML 中的 JS）,
    arrowParens: "avoid", // 控制箭头函数参数的括号
    bracketSameLine: true
  });
  return formatted
}