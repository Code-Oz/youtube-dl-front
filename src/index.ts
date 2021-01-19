import Vue from "vue"

import YoutubeDownloader from "./youtube-downloader"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

export const app = new Vue({
    el: "#app",
    render: h => h(YoutubeDownloader),
})
