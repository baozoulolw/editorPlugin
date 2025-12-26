import { lint as lintJs } from "./prettier/html";
import { runEslint } from "./eslint";
export const registerLint = (monaco) => {
  return
  //resister(monaco,'javascript')
  resister(monaco, '*')
  runEslint(monaco)
  //resister(monaco,'json')
};

const resister = (monaco, language) => {
  // 注册文档格式化提供者
  monaco.languages.registerDocumentFormattingEditProvider(language, {
    provideDocumentFormattingEdits: function (model, options, token) {
      return new Promise(async (resolve, reject) => {
        const text = model.getValue();
        const formatted = await lintJs(text)
        resolve([{
          range: model.getFullModelRange(),
          text: formatted
        }])
      });

    }
  });

  // 注册范围格式化提供者（用于格式化选中区域）
  monaco.languages.registerDocumentRangeFormattingEditProvider(language, {
    provideDocumentRangeFormattingEdits: function (model, range, options, token) {
      return new Promise(async resolve => {
        const text = model.getValueInRange(range);
        const formatted = await lintJs(text)
        resolve([{
          range: range,
          text: formatted
        }])
      })
    }
  });
}

const resisterAction = () => {
  // 1. 注册全局自定义指令（适用于整个编辑器）
  const customCommandId = 'custom.addCommentHeader';
  editor.addAction({
    // 指令唯一ID
    id: customCommandId,
    // 指令名称（显示在菜单中）
    label: '添加函数注释头',
    // 快捷键绑定（Windows: Ctrl+Shift+H, Mac: Cmd+Shift+H）
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyH
    ],
    // 执行指令时的回调
    run: function (ed) {
      const model = ed.getModel();
      if (!model) return;

      // 获取当前光标所在行
      const position = ed.getPosition();
      const lineNumber = position.lineNumber;

      // 获取当前行内容
      const lineContent = model.getLineContent(lineNumber);

      // 判断是否为函数定义行
      if (lineContent.match(/function\s+\w+\(/)) {
        // 提取函数名
        const functionName = lineContent.match(/function\s+(\w+)\(/)[1];


        // 在函数前插入注释
        const edit = {
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          text: comment
        };

        ed.executeEdits('custom-comment', [edit]);
        updateStatus(`已为 ${functionName} 添加注释头`);
      } else {
        updateStatus('请将光标放在函数定义行');
      }

      return null;
    },
    // 图标（可选，显示在菜单中）
    iconClass: 'custom-icon' // 需要自定义CSS样式
  });

  // 2. 注册选中区域的自定义指令
  const selectionCommandId = 'custom.wrapWithQuotes';
  editor.addAction({
    id: selectionCommandId,
    label: '用引号包裹选中内容',
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyQ
    ],
    run: function (ed) {
      const selection = ed.getSelection();
      if (selection.isEmpty()) {
        updateStatus('请先选中要处理的内容');
        return null;
      }

      const model = ed.getModel();
      const selectedText = model.getValueInRange(selection);

      // 用双引号包裹选中内容
      const wrappedText = `"${selectedText}"`;

      // 替换选中区域
      ed.executeEdits('wrap-quotes', [{
        range: selection,
        text: wrappedText
      }]);

      updateStatus('已用引号包裹选中内容');
      return null;
    }
  });
}

