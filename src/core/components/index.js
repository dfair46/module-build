import MyComponent from './MyComponent.vue';

// 导出组件
export { MyComponent };

// 默认导出插件安装方法
export default {
    install(app) {
        app.component('MyComponent', MyComponent);
    },
};