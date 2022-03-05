import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/home', component: '@/pages/home/index' },
    { path: '/login', component: '@/pages/login/index' },
    { path: '/', redirect: '/home' },
  ],
  fastRefresh: {},
  antd: false,
  hash: true,
});
