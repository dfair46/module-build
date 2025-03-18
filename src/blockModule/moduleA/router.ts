import { createRouter, createWebHistory } from 'vue-router';
import moduleARoute from "@/blockModule/moduleA/router/index.ts"

export const routes = moduleARoute

export const router = createRouter({
    history: createWebHistory(),
    routes
});