import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AccountsView from '@/views/AccountsView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: AccountsView }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
