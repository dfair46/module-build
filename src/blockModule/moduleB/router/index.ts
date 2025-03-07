const moduleARoute = [
    {
        path: '/moduleB',
        component: () => import('@/blockModule/moduleB/views/index.vue'),
    },
];


export default moduleARoute;