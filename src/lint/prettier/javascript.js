import prettier from 'prettier/standalone'
import * as parserBabel from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
export const lint = async (text) => {
  const formatted = await prettier.format(text, {
    parser: 'babel',
    plugins: [prettierPluginEstree, parserBabel],
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    semi: true,
    useTabs: false,
    tabWidth: 2,
    printWidth: 80,
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'strict',
    vueIndentScriptAndStyle: false,
    endOfLine: 'auto'
  });
  return formatted
}