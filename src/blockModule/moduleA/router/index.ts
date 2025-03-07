const moduleARoute = [
    {
        path: '/moduleA',
        component: () => import('@/blockModule/moduleA/views/index.vue'),
    },
];


export default moduleARoute;