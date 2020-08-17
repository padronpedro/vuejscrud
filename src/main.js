// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueI18n from 'vue-i18n'
import esMessages from '@/lang/es.json'
import store from './store'
import axios from 'axios'
import _ from 'lodash'
import authHeader from '@/services/auth-header'

Vue.config.productionTip = false

Vue.use(VueI18n)
var messages = {
  es: esMessages
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages,
  formatFallbackMessages: true
})

const axiosConfig = axios.create({
  baseURL: process.env.BACKEND_URL
})
Vue.prototype.$axios = axiosConfig

axiosConfig.interceptors.request.use(
  config => {
    const token = authHeader()
    if (token) {
      config.headers.common = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosConfig.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout', this.user).then(
        this.$goRouter('Login')
      )
    } else {
      return Promise.reject(error)
    }
  }
)

Vue.prototype.$goRouter = function (name, params, path) {
  if (path) {
    this.$router.push({ path: path, params: params }).catch(err => { err = null })
  } else {
    this.$router.push({ name: name, params: params }).catch(err => { err = null })
  }
}

/**
 * Display snackbar message
 * snack: {
        text: '',
        color: '',
        snackbar: false
      }
 */
Vue.prototype.$showError = function (message, color, timeout, thisModel) {
  thisModel.snackbar = true
  thisModel.text = message
  thisModel.color = color
  if (timeout) {
    setTimeout(() => {
      thisModel.snackbar = false
    }, (timeout * 1000))
  }
}

/**
 * Check if the user has permission to access something
 */
Vue.prototype.$userCan = function (accessThis) {
  if (this.$store.state.auth.user) {
    return _.find(this.$store.state.auth.user.permissions, function (item) {
      return item === accessThis
    })
  } else {
    return false
  }
}

/**
 * Check if the user has this ROle
 */
Vue.prototype.$userRole = function (thisRole) {
  return _.find(this.$store.state.auth.user.roles, function (item) {
    return item === thisRole
  })
}

/**
 * Get current user logged
 */
Vue.prototype.$currentUser = function () {
  return this.$store.state.auth.user
}

// filters
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// Define global eventHub
Vue.prototype.$eventHub = new Vue()

// auto register components in /components folder and sub-folders
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
