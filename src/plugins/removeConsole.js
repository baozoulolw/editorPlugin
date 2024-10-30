import MagicString from 'magic-string';

export default function remove(){
  return{
    name: 'remove-console-reassignments',
    transform(code, id) {
      const s = new MagicString(code);

      const stringsToCommentOut = [
        'console.warn =',
        'console.log =',
        'console.error ='
      ];

      // 遍历字符串数组，使用正则表达式匹配并注释化
      stringsToCommentOut.forEach(str => {
        const regex = new RegExp(`${str}\\s*;?\\s*`, 'g');
        let match;
        while ((match = regex.exec(code)) !== null) {
          // 将匹配到的文本前缀改为注释符号
          s.overwrite(match.index, match.index + match[0].length, `// ${match[0]}`);

        }
      });

      return {
        code: s.toString(),
        map: s.generateMap({ hires: true })
      };
    }
  }
}
