// main.js

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css' // 导入 Tailwind CSS

// 导入路由组件
import Home from './views/Home.vue'
import LuckyDrawWheel from './components/LuckyDrawWheel.vue'
import ProfilePage from './components/ProfilePage.vue'

// 定义路由
const routes = [
    { path: '/', component: Home },
    { path: '/lucky-draw', component: LuckyDrawWheel },
    { path: '/profile', component: ProfilePage },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 创建 Vue 应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')