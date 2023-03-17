import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default/Index'
import AdminLayout from '@/layouts/admin/Index'
import MainView from '@/modules/MainView'
import BoardView from '@/modules/boards/views/BoardView'
import BottleView from '@/modules/bottles/views/BottleView'
import BottleDetailView from '@/modules/bottles/views/BottleDetailView'
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
        component: BottleView,
        children : [
          {
            path:'/bottles/:bottleNo',
            name: 'BottleDetailView',
            component: BottleDetailView,
            props:true
          }
        ]
      },
      {
        path: '/boards',
        name: 'BoardView',
        component: BoardView
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
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    children: [

    ]
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
