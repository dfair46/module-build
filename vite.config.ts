import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
// @ts-ignore
import path from 'path'
import del from 'rollup-plugin-delete';

export default defineConfig(
    ({command}) => {
        console.log('process.env.VITE_BUILD_TARGET' ,process.env.VITE_BUILD_TARGET)
        const buildMode = process.env.VITE_BUILD_TARGET || 'all'
        // 模块打包映射路径
        const moduleMap = new Map([
            ['moduleA',
                {
                    rollUpInput: {
                        main: path.resolve(__dirname, 'index.html'),
                        // moduleA: path.resolve(__dirname, 'src/blockModule/moduleA/index.ts')
                    },
                    outDir: 'distVA',
                    isBase: false,
                    plugins: [
                        del({targets: ['dist/assets/moduleA/*', 'dist/assets/vendor/*',]}) // 仅清空 指定 下的内容
                    ]
                }
            ],
            ['moduleB',
                {
                    rollUpInput: {
                        main: path.resolve(__dirname, 'index.html'),
                        // moduleB: path.resolve(__dirname, 'src/blockModule/moduleB/index.ts')
                    },
                    outDir: 'distVB',
                    isBase: false,
                    plugins: [
                        del({targets: ['dist/assets/moduleB/*', 'dist/assets/index/*', 'dist/assets/main/*', 'dist/assets/vendor/*',]}) // 仅清空 指定 下的内容
                    ]
                }
            ],
            ['all',
                {
                    rollUpInput: {
                        main: path.resolve(__dirname, 'index.html'),
                    },
                    plugins: [
                        del({targets: ['dist/assets/moduleA/*','dist/assets/moduleB/*',  'dist/assets/index/*', 'dist/assets/main/*', 'dist/assets/vendor/*',]}) // 仅清空 指定 下的内容
                    ],
                    isBase: true
                }
            ],
        ])

        const currentBuildModule = moduleMap?.get(buildMode) || {
            rollUpInput: {main: path.resolve(__dirname, 'index.html')},
            isBase: true
        }
        const rollUpInput = currentBuildModule?.rollUpInput
        const currentDir = currentBuildModule?.outDir || 'dist'
        const rollUpPlugins = currentBuildModule?.plugins || []
        const external: any = []

        return {
            plugins: [vue(), dts()],
            resolve: {
                alias: {
                    // @ts-ignore
                    '@': path.resolve(__dirname, 'src')
                }
            },
            build: {
                manifest: true, // 生成 manifest.json 文件
                emptyOutDir: currentBuildModule.isBase,
                outDir: currentDir, // 生成不同的打包文件夹
                rollupOptions: {
                    input: {
                        ...rollUpInput
                    },
                    output: {
                        manualChunks: (id: any) => {
                            // 把 Vue 和 Pinia 等公共依赖拆出去
                            if (id.includes('node_modules')) {
                                return 'vendor-chunk';
                            }
                        },
                    },
                    preserveModules: true,
                    plugins: rollUpPlugins,
                    external
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
