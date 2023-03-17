import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default/Index'
import AdminLayout from '@/layouts/admin/Index'
import MainView from '@/modules/MainView'
import BoardView from '@/modules/boards/views/BoardView'
import BottleView from '@/modules/bottles/views/BottleView'
import NoticeView from '@/modules/notices/views/NoticeView'
import FaqView from '@/modules/faqs/views/FaqView'

const routes = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'MainView',
        component: MainView
      },
      {
        path: '/bottles',
        name: 'BottleView',
        component: BottleView
      },
      {
        path: '/boards',
        name: 'BoardView',
        component: BoardView,
        children: [
          {
            path: '/boards',
            name: 'BoardListComp',
            component: () => import('@/modules/boards/components/BoardListComp')
          },
          {
            path: '/boards/:boardNo',
            name: 'BoardDetailComp',
            component: () => import('@/modules/boards/components/BoardDetailComp')
          }
        ]
      },
      {
        path: '/notices',
        name: 'NoticeView',
        component: NoticeView
      },
      {
        path: '/faqs',
        name: 'FaqView',
        component: FaqView
      }
    ]
  }, {
    path: '/',
    name: 'AdminLayout',
    component: AdminLayout,
    children: [

    ]
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
