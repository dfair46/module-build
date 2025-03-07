import { createApp } from 'vue';
import ModuleA from './index.vue'; // 入口组件，确保 ModuleA 结构完整
import router from '@/router'; // 这里导入整个项目的路由，保证完整性

const app = createApp(ModuleA);

// 使用全局 router，确保 moduleA 也能访问完整路由
app.use(router);

app.mount('#app'); // 这里的 #app 需要和 `index.html` 里的一致