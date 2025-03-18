import fs from 'fs-extra';

const src = 'distVA';
const dest = 'dist';

console.log('process.env.VITE_BUILD_TARGET', process.env.BUILD_TARGET)
// 清理旧文件
fs.emptyDirSync(`${dest}/assets`);

// 复制新文件
fs.copySync(src, dest, { overwrite: true })

// 清理moduleA
fs.emptyDirSync(`${src}/`);
fs.removeSync(`${src}/`)


console.log('✅ 文件合并完成');