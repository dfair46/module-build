import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // @ts-ignore
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        outDir: 'dist/routes-a', // 将输出文件放在 dist/routes-a
        manifest: true, // 生成 manifest.json，供动态加载使用
        rollupOptions: {
            input: {
                routes: './src/blockModule/moduleA/router/index.ts' // 只打包 routes-a.ts 相关内容
            },
            output: {
                manualChunks(id) {
                    if (id.includes('moduleA')) {
                        return 'page-a'; // 将 PageA 相关内容拆分成独立 chunk
                    }
                }
            }
        }
    }
});