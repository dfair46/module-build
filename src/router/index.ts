import {createRouter, createWebHistory} from 'vue-router';

// 基础路由
let routes = [
    {
        path: '/',
        component: () => import('@/core/views/index.vue'),
    },
];

console.log('import.meta.env?.VITE_BUILD_TARGET', import.meta.env?.VITE_BUILD_TARGET)
// if (import.meta.env?.VITE_BUILD_TARGET === 'local' || !import.meta.env?.VITE_BUILD_TARGET) {
//     const routeAModules = import.meta.glob('../blockModule/moduleA/router/*.ts', {eager: true});
//     // 解析模块并注册到 routes 中
//     for (const path in routeAModules) {
//         const route = (routeAModules[path] as any)?.default;
//         console.log('route', route)
//         if (route) {
//             routes = routes.concat(route);
//         }
//     }
//
//     const routeBModules = import.meta.glob('../blockModule/moduleB/router/*.ts', {eager: true});
//     for (const path in routeBModules) {
//         const route = (routeBModules[path] as any)?.default;
//         if (route) {
//             routes = routes.concat(route);
//         }
//     }
// }
if (import.meta.env?.VITE_BUILD_TARGET === 'moduleA') {
    const routeAModules = import.meta.glob('../blockModule/moduleA/router.ts', {eager: true});
    // const routeAModules = import.meta.glob(`../blockModule/${__BUILD_TARGET__}/router.ts`, {eager: true});
    // 解析模块并注册到 routes 中
    for (const path in routeAModules) {
        const route = (routeAModules[path] as any)?.routes;
        console.log('route', route)
        if (route) {
            routes = routes.concat(route);
        }
    }
}
// if (import.meta.env?.VITE_BUILD_TARGET === 'moduleB') {
//     const routeBModules = import.meta.glob('../blockModule/moduleB/router/*.ts', {eager: true});
//     for (const path in routeBModules) {
//         const route = (routeBModules[path] as any)?.default;
//         if (route) {
//             routes = routes.concat(route);
//         }
//     }
// }


console.log('routes', routes)
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;