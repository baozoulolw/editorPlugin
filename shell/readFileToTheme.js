import fs from 'fs';
import path from 'path';

// 定义要遍历的目录路径
const dirThemePath = 'src/resource/themes';
const outputPath = 'src/theme/themeList.js'; 

const fileData = [
  // {
  //   name:'system',
  //   children:[
  //     {
  //       value: 'vs-dark',
  //       label: 'vs-dark',
  //       defaultTheme:true,
  //       cache: false,
  //       load: false,
  //       parent: 'system'
  //     },
  //     {
  //       value: 'vs',
  //       label: 'vs',
  //       defaultTheme:true,
  //       cache: false,
  //       load: false,
  //       parent: 'system'
  //     },
  //     {
  //       value: 'hc-black',
  //       label: 'hc-black',
  //       defaultTheme:true,
  //       cache: false,
  //       load: false,
  //       parent: 'system'
  //     }
  //   ]
  // }
]
// 遍历目录的函数
const traverseDirectorySync = async dirPath => {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const { name } = file
    const filePath = path.join(dirPath, name);
    
    if(name === '.DS_Store') continue
    if (file.isDirectory()) {
      fileData.push({
        name: name,
        children: []
      })
      // 如果是子目录，递归遍历
      traverseDirectorySync(filePath);
    } else {
      const parent = (file.path ?? file.parentPath).split('/').pop()
      const item = fileData.find(i => i.name === parent)
      let nameFile = name.split('.')[0]
      let ext = parent + '-' + nameFile
      item.children.push({
        value: ext.replaceAll(' ', '-').replaceAll(/[()]/g, ''),
        label: nameFile,
        cache: false,
        load: false,
        parent
      })
    }
  }
}
const writeFilePaths = data => {
  const content = `export const codeThemeList = ${JSON.stringify(data, null, 2)};`;

  try {
    fs.writeFileSync(outputPath, content);
    console.log(`File paths written to ${outputPath}`);
  } catch (err) {
    console.error('Error writing file:', err);
  }
}
traverseDirectorySync(dirThemePath)
writeFilePaths(fileData)
