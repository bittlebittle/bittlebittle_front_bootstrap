import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default/Index'
import AdminLayout from '@/layouts/admin/Index'
import MainView from '@/modules/MainView'
import BoardView from '@/modules/boards/views/BoardView'
import BottleView from '@/modules/bottles/views/BottleView'
import BottleDetailView from '@/modules/bottles/views/BottleDetailView'
import NoticeView from '@/modules/notices/views/NoticeView'
import FaqView from '@/modules/faqs/views/FaqView'
import AdminBottleView from '@/layouts/admin/AdminBottleView'
import AdminBottleDetailView from '@/layouts/admin/AdminBottleDetailView'

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
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    children: [
      {
        path: '/admin/bottles',
        name: 'AdminBottleView',
        component: AdminBottleView,
        children : [
          {
            path:'/admin/bottles/:bottleNo',
            name: 'AdminBottleDetailView',
            component: AdminBottleDetailView,
            props:true
          }
        ]
      }

    ]
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
