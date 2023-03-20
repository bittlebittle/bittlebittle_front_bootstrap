import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default/Index'
import AdminLayout from '@/layouts/admin/Index'
import AuthenticationLayout from '@/layouts/authentication/Index'
import MainView from '@/modules/MainView'
import UserView from '@/modules/users/views/UserView'
import BoardView from '@/modules/boards/views/BoardView'
import Bottle from '@/modules/bottles/views/Bottle'
import BottleAll from '@/modules/bottles/views/BottleAll'
import BottleDetailView from '@/modules/bottles/views/BottleDetailView'
import NoticeView from '@/modules/notices/views/NoticeView'
import FaqView from '@/modules/faqs/views/FaqView'
import AdminBottleView from '@/layouts/admin/AdminBottleView'
import AdminBottleDetailView from '@/layouts/admin/AdminBottleDetailView'
import AdminBottle from '@/layouts/admin/AdminBottle'
import AdminTagView from '@/layouts/admin/AdminTagView'

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
        path: '/users',
        name: 'UserView',
        component: UserView,
        children: [
          {
            path: '/users/:userNo',
            name: 'UserMyPageComp',
            component: () => import('@/modules/users/components/UserMyPageComp')
          },
          {
            path: '/users/addition',
            name: 'UserRegisterComp',
            component: () => import('@/modules/users/components/UserRegisterComp')
          }
        ]
      },
      {
        path: '/bottles',
        name: 'Bottle',
        component: Bottle,
        children: [
          {
            path: '/bottles',
            name: 'BottleAll',
            component: BottleAll
          },
          {
            path: '/bottles/:bottleNo',
            name: 'BottleDetailView',
            component: BottleDetailView,
            props: true
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
          },
          {
            path: '/boards/addition',
            name: 'BoardCreateComp',
            component: () => import('@/modules/boards/components/BoardCreateComp')
          },
          {
            path: '/boards/set-data',
            name: 'BoardEditComp',
            component: () => import('@/modules/boards/components/BoardEditComp')
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
      },
      {
        path: '/all',
        name: 'BottleAll',
        component: BottleAll
      }
    ]
  }, {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    children: [
      {
        path: '/admin/bottles',
        name: 'AdminBottle',
        component: AdminBottle,
        children: [
          {
            path: '/admin/bottles',
            name: 'AdminBottleView',
            component: AdminBottleView
          },
          {
            path: '/admin/bottles/:bottleNo',
            name: 'AdminBottleDetailView',
            component: AdminBottleDetailView,
            props: true
          },
          {
            path: '/admin/tags',
            name: 'AdminTagView',
            component: AdminTagView
          }
        ]
      },
      {
        path: '/admin/tags',
        name: 'AdminTagView',
        component: AdminTagView
      }

    ]
  },
  {
    path: '/auth',
    name: 'AuthenticationLayout',
    component: AuthenticationLayout,
    children: [
      {
        path: '/login',
        name: 'UserLoginComp',
        component: () => import('@/modules/users/components/UserLoginComp')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
