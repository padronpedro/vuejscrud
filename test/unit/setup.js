import Vue from 'vue'
import Vuetify from 'vuetify';
import { config } from "@vue/test-utils"

// mock for i18n
config.mocks['$t'] = (msg) => {
  return msg
}
// mock for $showError
config.mocks['$showError'] = (message, color, timeout, params) => {
  return true
}
// mock for $goRouter
config.mocks['$goRouter'] = (path) => {
  return path
}
// mock for $userCan
config.mocks['$userCan'] = (permission) => {
  return true
}

Vue.use(Vuetify);

Vue.config.productionTip = false
