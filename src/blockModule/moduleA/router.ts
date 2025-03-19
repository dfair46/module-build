export const routes = [
    {
        path: '/moduleA',
        component: () => import('@/blockModule/moduleA/views/index.vue'),
    },
];