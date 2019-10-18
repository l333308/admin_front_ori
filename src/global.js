import Vue from 'vue'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'

import Pagination from '@/components/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import DatetimeRangePicker from '@/components/DatetimeRangePicker'
import SimpleSelector from '@/components/SimpleSelector'
import RemoteSelector from '@/components/RemoteSelector'
import RouterLink from '@/components/RouterLink'
import ProductCategorySelector from '@/components/ProductCategorySelector'
import SimpleInput from '@/components/SimpleInput'
import SimpleFormItem from '@/components/SimpleFormItem'

import request from './utils/request'

import {TitleByRouteName} from '@/menuConfig'
import {WhiteList} from "./menuConfig";
import {today} from "./utils/date";
import {buildQueryString} from "./utils/common";

Vue.component('Pagination', Pagination)
Vue.component('DateRangePicker', DateRangePicker)
Vue.component('DatetimeRangePicker', DatetimeRangePicker)
Vue.component('SimpleSelector', SimpleSelector)
Vue.component('RemoteSelector', RemoteSelector)
Vue.component('RouterLink', RouterLink)
Vue.component('ProductCategorySelector', ProductCategorySelector)
Vue.component('SimpleInput', SimpleInput)
Vue.component('SimpleFormItem', SimpleFormItem)

window.request = request
Vue.mixin({
  methods: {
    // 是否有权限?
    can: function (permission) {
        return true
      const permissions = this.$store.state.user.permissions || {}
      return permissions.indexOf(permission) >= 0 || WhiteList.indexOf(permission) >= 0
    },
    search: function () {
      if (this.$refs.pagination) {
        this.$refs.pagination.search()
      }
    },
    // 表格排序
    sortChange(change) {
      this.query.sortBy = change.prop
      this.query.sortDirection = change.order
      this.search()
    },
    // 勾选
    selectRows(rows) {
      this.selectedRows = rows
    },
    // 层架号中文
    floorInChinese(floor) {
      const floors = ['一', '二', '三', '四', '五', '六']
      return floors[floor - 1] || floor
    },
    _get_title(to) {
      const func = TitleByRouteName[to.name]
      if (func) {
        return func(to.query)
      }
      const title = this.$store.state.auth.titleOfMenu[to.name]
      return title || to.name
    },
    // 导出
    download() {
        const loadingInstance = Loading.service({ fullscreen: true, text: '正在导出中...' })
        let query = Object.assign({},this.query)
        query._export = true

        let url = this.url
        if(!url&&this.$refs.pagination){
            url = this.$refs.pagination.getUrl()
        }
        request.get(url, { params: query }).then(res => {
            loadingInstance.close()
            res = res.data || {}
            if (res.code === '0') {
                if(res.data.downloadUrl){
                    window.open(res.data.downloadUrl,'_blank')
                }else {
                    Message.success(res.msg)
                }
            } else {
                Message.warning(res.msg || '导出失败，请稍后重试')
            }
        })

      // const query = Object.assign({}, this.query)
      // query._export = true
      // const queryString = buildQueryString(query)
      // window.location.href = '/api/v1' + this.url + '?' + queryString
      // // window.open('/api/v1' + this.url + '?' + queryString, '_blank') // TODO
    }
  },
  computed: {
    // 兼容vue-router
    $route: function () {
      return {query: this.$tab.query()}
    },
    $router: function () {
      const self = this
      return {
        push: function (to, perm = '') {
          const component = to.name
          let actualPerm = perm || to.name
          if (!self.can(actualPerm)) {
            return
          }
          const tab = {title: self._get_title(to), component: component, menuId: component}
          tab.query = to.query || {}
          self.$tab.open(tab)
        }
      }
    },
    today: function () {
      return today
    }
  }
})
