import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import axios from 'axios'
import VueParticlesBg from 'particles-bg-vue'
import './assets/styles/index.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
 
// import Vconsole from 'vconsole'

 
// let vConsole = new Vconsole()
 
// Vue.use(vConsole);
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer) 

Vue.use(VueParticlesBg)
Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
