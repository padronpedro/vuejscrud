import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import Demo from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  history: true,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
