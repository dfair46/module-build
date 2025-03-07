import { createRouter, createWebHistory } from 'vue-router';
import moduleARoute from "@/blockModule/moduleA/router/index.ts"
import moduleBRoute from "@/blockModule/moduleB/router/index.ts"

// 基础路由
const routes = [
    {
        path: '/',
        component: () => import('@/core/views/index.vue'),
    },
    // {
    //     path: '/moduleA',
    //     component: () => import('@/blockModule/moduleA/views/index.vue'), // 动态加载模块 A 的页面
    // },
    // {
    //     path: '/moduleB',
    //     component: () => import('@/blockModule/moduleB/views/index.vue'), // 动态加载模块 B 的页面
    // },
    ...moduleARoute,
    ...moduleBRoute
];

/**
 *
 */
// 动态导入 moduleA 和 moduleB 的路由
// async function loadModuleRoutes() {
//     try {
//         const moduleARoutes = (await import('./blockModule/moduleA/router')).default;
//         routes.push(...moduleARoutes);
//     } catch (e) {
//         console.warn('moduleA 未加载');
//     }
//     try {
//         const moduleBRoutes = (await import('./blockModule/moduleB/router')).default;
//         routes.push(...moduleBRoutes);
//     } catch (e) {
//         console.warn('moduleB 未加载');
//     }
// }
//
// await loadModuleRoutes();

const router = createRouter({
    history: createWebHistory(),
    routes
});
/**
 *
 */

// const router = createRouter({
//     history: createWebHistory(),
//     routes:[
//         ...routes,
//         ...moduleARoute
//     ]
// });

export default router;