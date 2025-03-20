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
                routes: path.resolve(__dirname, './src/blockModule/moduleA/router.ts')// 只打包 routes-a.ts 相关内容
            },
            output: {
                entryFileNames: 'assets/moduleA/[name]-[hash].js', // 输出文件名
                chunkFileNames: 'assets/moduleA/[name]-chunk-[hash].js', // 分块文件名
                assetFileNames: 'assets/resource/[name]-[hash].[ext]', // 静态资源文件名
                manualChunks(id) {
                    if (id.includes('moduleA')) {
                        return 'routes'; // 将 PageA 相关内容拆分成独立 chunk
                    }
                }
            },
            // #https://cn.rollupjs.org/configuration-options/#preserveentrysignatures
            preserveEntrySignatures: 'strict'

        }
    }
});