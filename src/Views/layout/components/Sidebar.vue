<template>
    <el-menu mode="vertical" :default-active="activeMenu" background-color="#304156" :default-openeds="openeds"
             v-if="menuList" style="border-right: solid 0px;"
             text-color="#bfcbd9">
        <el-submenu v-for="(item,index) in menuList" :key="index" :index="String(item.menuId)" v-if="item.sub">
            <template slot="title">
                <svg-icon :icon-class="item.icon || 'fas fa-list'"></svg-icon>
                <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subItem,subIndex) in item.sub"
                          :index="String(subItem.menuId)">
                <router-link :to="{name:subItem.component}">
                    <svg-icon :icon-class="subItem.icon || 'fas fa-list'"></svg-icon>
                    <span>{{subItem.title}}</span>
                </router-link>
            </el-menu-item>
        </el-submenu>
        <el-menu-item :index="String(item.menuId)" v-else>
            <router-link :to="{name:item.component}">
                <svg-icon :icon-class="item.icon || 'fas fa-list'"></svg-icon>
                <span>{{item.title}}</span>
            </router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
  import {EventBus} from '@/event-bus'

  export default {
    name: 'sidebar',
    data: function () {
      return {
        menuList: [],
        openeds: []
      }
    },
    computed: {
      activeMenu: function () {
        return this.$store.getters.GetCurrentTabIndex
      }
    },
    methods: {
      openFirstMenu() {
        const first = this.getFirstMenu(this.menuList)
        if (first) {
          this.$tab.open(first)
        }
      },
      getFirstMenu(menus) {
        for (let i = 0; i < menus.length; i++) {
          const x = menus[i]
          if (!x.sub) {
            return x
          }
          return this.getFirstMenu(x.sub)
        }
      },
      // TODO:搜索菜单
      filterMenu() {
        this.spreadedMenus = []
        const keyword = this.searchText
        const menu = Object.assign({}, this.menuList)
        this.menuList = menu.filter(item => {
          item.sub = item.sub.filter(i => {
            return i.title.indexOf(keyword) > -1
          })
          return item.sub.length > 0 && this.spreadedMenus.push(item.menuId)
        })
      },
      expandMenu() {
        const activeMenu = this.activeMenu
        let result = []
        const menuList = this.menuList || []
        menuList.forEach(x => {
          if (!x.sub) {
            return
          }
          x.sub.forEach(child => {
            if (child.component === activeMenu) {
              result = [x.component]
            }
          })
        })
        this.openeds = result
      },
      // 如果该模块没有打开任何菜单，则打开第一个
      handleModuleClick(module) {
        const tabs = this.$store.getters.GetOpenedTabs
        const moduleByRoute = this.$store.state.auth.moduleByRoute
        let shouldOpenFirst = true
        for (let i = 0; i < tabs.length; i++) {
          const tab = tabs[i]
          // 该模块已有打开的tab
          if (moduleByRoute[tab.component] === module.name) {
            shouldOpenFirst= false
            this.$tab.open(tab)
            break
          }
        }
        if(shouldOpenFirst){
          this.openFirstMenu()
        }
      }
    },
    created() {
      const self = this
      EventBus.$on('switchModule', function (module, menuList) {
        self.menuList = []
        self.$nextTick(() => {
          self.menuList = menuList
          self.handleModuleClick(module)
          self.expandMenu()
        })
      })
    }
  }
</script>

<style scoped>

</style>