import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import Register from '@/components/pages/Register'

import AdmUsers from '@/components/pages/admin/users/AdmUsers'
import AddEditUsers from '@/components/pages/admin/users/AddEditUsers'
import Demo from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  history: true,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/users',
      name: 'AdmUsers',
      component: AdmUsers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/users/edit/:id',
      name: 'EditUsers',
      component: AddEditUsers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/users/add',
      name: 'AddUsers',
      component: AddEditUsers,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = localStorage.getItem('user')
    if (!loggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
