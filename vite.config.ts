import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
// @ts-ignore
import path from 'path'

export default defineConfig(
    ({command }) => {

        const buildMode = process.env.BUILD_TARGET || 'all'
        const isModuleA = buildMode === 'moduleA';
        const isModuleB = buildMode === 'moduleB';
        const isBase = !isModuleA && !isModuleB;
        let rollUpInput = isBase
            ? { main: path.resolve(__dirname, 'index.html') }
            : isModuleA
                ? { main: path.resolve(__dirname, 'index.html'), moduleA: path.resolve(__dirname, 'src/blockModule/moduleA/index.ts') }
                : { main: path.resolve(__dirname, 'index.html'), moduleB: path.resolve(__dirname, 'src/blockModule/moduleB/index.ts') }

        let external = []
        if(buildMode === 'all'){
            rollUpInput = {
                main: path.resolve(__dirname, 'index.html') ,
                moduleA: path.resolve(__dirname, 'src/blockModule/moduleA/index.ts'),
                moduleB: path.resolve(__dirname, 'src/blockModule/moduleB/index.ts')
            }
        }

        return {
            // base: './',
            plugins: [vue(), dts()],
            resolve: {
                alias: {
                    // @ts-ignore
                    '@': path.resolve(__dirname, 'src')
                }
            },
            build: {
                emptyOutDir: isBase,
                outDir: `dist`, // 生成不同的打包文件夹
                rollupOptions: {
                    input: {
                        ...rollUpInput
                        // main: path.resolve(__dirname, 'index.html'), // 主入口
                        // moduleA: path.resolve(__dirname, 'src/blockModule/moduleA/index.html'), // 模块 A 入口
                        // moduleB: path.resolve(__dirname, 'src/blockModule/moduleB/index.html'), // 模块 B 入口
                    },
                    output: {
                        entryFileNames: 'assets/[name].js', // 输出文件名
                        chunkFileNames: 'assets/[name]-chunk.js', // 分块文件名
                        assetFileNames: 'assets/[name].[ext]', // 静态资源文件名
                        manualChunks: (id:any) => {
                            // 把 Vue 和 Pinia 等公共依赖拆出去
                            if (id.includes('node_modules')) {
                                return 'vendor';
                            }
                        },
                    },
                    preserveModules: true,
                    external// 复用 main.js 的 vendor.js
                }
            },

            server: {
                proxy: {
                    '/modules': '/dist/modules'
                }
            }
        }
    }
);
