/**
 * 注册JavaScript语言补全提供者
 */
export const registerJavaScriptCompletion = (monaco) => {
  
  // 注册代码补全提供者
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: function(model, position) {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn
      }

      // 检测是否输入了 "log"
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      })

      // 如果输入了 "log"，提供 console.log 补全
      if (textUntilPosition.trim().endsWith('log')) {
        return {
          suggestions: [{
            label: 'console.log',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: '输出日志到控制台',
            insertText: 'console.log(${1:})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
          }]
        }
      }

      return { suggestions: [] }
    }
  })

  // 注册额外的代码片段
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: function() {
      return {
        suggestions: [
          {
            label: 'clg',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: '快速插入 console.log',
            insertText: 'console.log(${1:})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          },
          {
            label: 'log',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: '快速插入 console.log',
            insertText: 'console.log(${1:})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          }
        ]
      }
    }
  })
}