/**
 * Prettier 3.6.2 完整配置示例
 * 每个配置项包含：默认值、修改示例、格式化前后对比
 */
export default {
  // 1. 代码换行的最大长度（字符数）
  printWidth: 80, // 默认值
  // printWidth: 60, // 修改示例
  /*
  // printWidth: 80（默认）
  const longVariableName = anotherVeryLongVariableName + someOtherVariable * 2;
  
  // printWidth: 60（修改后）
  const longVariableName =
    anotherVeryLongVariableName + someOtherVariable * 2;
  */

  // 2. 缩进的空格数
  tabWidth: 2, // 默认值
  // tabWidth: 4, // 修改示例
  /*
  // tabWidth: 2（默认）
  function foo() {
    return 1;
  }
  
  // tabWidth: 4（修改后）
  function foo() {
      return 1;
  }
  */

  // 3. 是否使用制表符(tab)而非空格缩进
  useTabs: false, // 默认值
  // useTabs: true, // 修改示例
  /*
  // useTabs: false（默认）使用空格
  function foo() {
    return 1;
  }
  
  // useTabs: true（修改后）使用制表符
  function foo() {
  \treturn 1; // \t 表示制表符
  }
  */

  // 4. 语句末尾是否添加分号
  semi: true, // 默认值
  // semi: false, // 修改示例
  /*
  // semi: true（默认）
  const a = 1;
  function foo() {}
  
  // semi: false（修改后）
  const a = 1
  function foo() {}
  */

  // 5. 是否使用单引号而非双引号
  singleQuote: false, // 默认值
  // singleQuote: true, // 修改示例
  /*
  // singleQuote: false（默认）
  const str = "hello";
  const obj = { key: "value" };
  
  // singleQuote: true（修改后）
  const str = 'hello';
  const obj = { key: 'value' };
  */

  // 6. 对象属性是否加引号
  quoteProps: "as-needed", // 默认值：仅必要时加引号
  // quoteProps: "consistent", // 所有属性保持一致（要么都加，要么都不加）
  // quoteProps: "preserve", // 保留原始格式
  /*
  // quoteProps: "as-needed"（默认）
  const obj = {
    normalKey: 1,
    "key-with-hyphen": 2 // 仅特殊属性加引号
  };
  
  // quoteProps: "consistent"（修改后）
  const obj = {
    "normalKey": 1,
    "key-with-hyphen": 2 // 所有属性都加引号
  };
  
  // quoteProps: "preserve"（修改后）
  const obj = {
    normalKey: 1,
    "key-with-hyphen": 2 // 保留原始引号状态
  };
  */

  // 7. 多行结构中是否添加尾逗号
  trailingComma: "all", // 默认值：所有可能的地方都加
  // trailingComma: "es5", // 仅在 ES5 允许的地方加（数组、对象）
  // trailingComma: "none", // 不加尾逗号
  /*
  // trailingComma: "all"（默认）
  const arr = [
    1,
    2,
    3, // 有尾逗号
  ];
  const obj = {
    a: 1,
    b: 2, // 有尾逗号
  };
  function foo(
    param1,
    param2, // 有尾逗号
  ) {}
  
  // trailingComma: "es5"（修改后）
  const arr = [
    1,
    2,
    3, // 数组有尾逗号
  ];
  const obj = {
    a: 1,
    b: 2, // 对象有尾逗号
  };
  function foo(
    param1,
    param2 // 函数参数无尾逗号
  ) {}
  
  // trailingComma: "none"（修改后）
  const arr = [
    1,
    2,
    3 // 无尾逗号
  ];
  const obj = {
    a: 1,
    b: 2 // 无尾逗号
  };
  */

  // 8. 对象字面量大括号前后是否加空格
  bracketSpacing: true, // 默认值：加空格
  // bracketSpacing: false, // 修改示例：不加空格
  /*
  // bracketSpacing: true（默认）
  const obj = { a: 1 };
  
  // bracketSpacing: false（修改后）
  const obj = {a: 1};
  */

  // 9. 多行元素的闭合括号是否和最后一行内容在同一行
  bracketSameLine: false, // 默认值：单独成行
  // bracketSameLine: true, // 修改示例：同一行
  /*
  // bracketSameLine: false（默认）
  <div
    class="container"
  >
    content
  </div>
  
  const arr = [
    1,
    2,
    3
  ];
  
  // bracketSameLine: true（修改后）
  <div
    class="container"
  >
    content</div>
  
  const arr = [
    1,
    2,
    3];
  */

  // 10. 箭头函数参数是否加括号
  arrowParens: "always", // 默认值：总是加括号
  // arrowParens: "avoid", // 修改示例：可省略时不加
  /*
  // arrowParens: "always"（默认）
  const foo = (x) => x * 2;
  const bar = (x, y) => x + y;
  
  // arrowParens: "avoid"（修改后）
  const foo = x => x * 2; // 单个参数可省略括号
  const bar = (x, y) => x + y; // 多个参数仍需括号
  */

  // 11. 只格式化从该索引开始的代码（默认格式化整个文件）
  rangeStart: 0, // 默认值
  // rangeStart: 10, // 修改示例：从第10个字符开始格式化

  // 12. 只格式化到该索引结束的代码
  rangeEnd: Infinity, // 默认值
  // rangeEnd: 100, // 修改示例：只格式化到第100个字符

  // 13. 是否只格式化包含特定注释（/** @format */）的文件
  requirePragma: false, // 默认值：格式化所有文件
  // requirePragma: true, // 修改示例：仅格式化包含注释的文件
  /*
  // requirePragma: true 时，只有包含以下注释的文件才会被格式化
  /** @format 
  const foo = 1;
  */

  // 14. 是否在格式化后的文件顶部插入 /** @format */ 注释
  insertPragma: false, // 默认值：不插入
  // insertPragma: true, // 修改示例：插入注释
  /*
  // insertPragma: true 格式化后会添加：
  /** @format 
  const foo = 1;
  */

  // 15. Markdown 文本的换行方式
  proseWrap: "preserve", // 默认值：保留原始换行
  // proseWrap: "always", // 超过 printWidth 时总是换行
  // proseWrap: "never", // 从不换行，让编辑器自动处理
  /*
  // proseWrap: "preserve"（默认）保留原始换行
  这是一段很长的文本，在源代码中是一行，
  这里手动换行了。
  
  // proseWrap: "always"（修改后）超过 printWidth 自动换行
  这是一段很长的文本，在源代码中是一行，但因为超过了
  printWidth 被自动换行了。
  
  // proseWrap: "never"（修改后）不自动换行
  这是一段很长的文本，在源代码中是一行，但因为设置了 never，所以不会被自动换行，会保持一行的状态。
  */

  // 16. HTML 中空白的敏感度
  htmlWhitespaceSensitivity: "css", // 默认值：遵循 CSS 对空白的处理
  // htmlWhitespaceSensitivity: "strict", // 严格处理空白（空白会影响布局）
  // htmlWhitespaceSensitivity: "ignore", // 忽略空白差异
  /*
  // htmlWhitespaceSensitivity: "css"（默认）
  <div>hello</div>
  <div>world</div>
  
  // htmlWhitespaceSensitivity: "strict"（修改后）会保留空格
  <div>hello</div> <div>world</div>
  
  // htmlWhitespaceSensitivity: "ignore"（修改后）会压缩空格
  <div>hello</div><div>world</div>
  */

  // 17. Vue 文件中 <script> 和 <style> 标签内的代码是否缩进
  vueIndentScriptAndStyle: false, // 默认值：不缩进
  // vueIndentScriptAndStyle: true, // 修改示例：缩进
  /*
  // vueIndentScriptAndStyle: false（默认）
  <template>
    <div></div>
  </template>
  <script>
  export default {
  };
  </script>
  
  // vueIndentScriptAndStyle: true（修改后）
  <template>
    <div></div>
  </template>
  <script>
    export default {
    };
  </script>
  */

  // 18. 行尾换行符
  endOfLine: "lf", // 默认值：Unix 风格（\n）
  // endOfLine: "crlf", // Windows 风格（\r\n）
  // endOfLine: "cr", // 旧式 Mac 风格（\r）
  // endOfLine: "auto", // 保持文件原有的换行符风格

  // 19. 是否格式化嵌入在其他文件中的代码
  embeddedLanguageFormatting: "auto", // 默认值：自动格式化
  // embeddedLanguageFormatting: "off", // 修改示例：不格式化嵌入代码
  /*
  // embeddedLanguageFormatting: "auto"（默认）
  <script>
  function foo(){console.log('hello')}
  </script>
  // 格式化后
  <script>
  function foo() {
    console.log('hello');
  }
  </script>
  
  // embeddedLanguageFormatting: "off"（修改后）
  <script>
  function foo(){console.log('hello')} // 不会被格式化
  </script>
  */

  // 20. 对于单文件组件中的 CSS 语言的缩进
  singleAttributePerLine: false, // 默认值：不强制单个属性一行
  // singleAttributePerLine: true, // 修改示例：每个属性单独一行
  /*
  // singleAttributePerLine: false（默认）
  <div class="foo" id="bar" data-id="123"></div>
  
  // singleAttributePerLine: true（修改后）
  <div
    class="foo"
    id="bar"
    data-id="123"
  ></div>
  */
};
