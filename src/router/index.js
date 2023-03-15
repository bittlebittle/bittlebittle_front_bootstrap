import { createRouter, createWebHistory } from 'vue-router'
import DefaulfLayout from '@/layouts/default/Index'
import MainView from '@/modules/MainView'

const routes = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: DefaulfLayout,
    children: [
      {
        path: '/',
        name: 'MainView',
        component: MainView
      }
    ]
  }, {

  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
