import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/backstage/Admin.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "admin" */ '../views/backstage/Dashboard.vue'),
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import(/* webpackChunkName: "admin" */ '../views/backstage/Products.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import(/* webpackChunkName: "admin" */ '../views/backstage/Orders.vue'),
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import(/* webpackChunkName: "admin" */ '../views/backstage/Coupon.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
