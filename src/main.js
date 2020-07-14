// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueI18n from 'vue-i18n'
import esMessages from '@/lang/es.json'

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
  components: { App },
  template: '<App/>'
})
