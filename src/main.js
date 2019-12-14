import Vue from 'vue'
import App from './App.vue'
import CompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(CompositionAPI)

new Vue({
  render: h => h(App),
}).$mount('#app')
