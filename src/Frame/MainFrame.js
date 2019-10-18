import  "babel-polyfill";   // 兼容IE

import Vue from 'vue'
import store from '@/Store/index'
import index from './MainFrame.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TabRoute from '@/Router/TabRoute'
import RouterMethods from '@/Router/RouterMethods'
import Main from './MainFrame.vue'

// icon
import '../icons'

// global component
import '../global'

Vue.use(TabRoute)
Vue.use(RouterMethods)
Vue.use(ElementUI, {size: 'medium'});

new Vue({
    el: '#app',
    store,
    data: {
        currentRoute: window.location.hash.split('?')[0] // 可能带参数
    },
    computed: {
        ViewComponent () {
            return Main
        }
    },
    render (h) { return h(this.ViewComponent) }
    //render: v => v(index)
})