<template>
    <el-menu class="navbar" mode="horizontal" :default-active="activeModule" @select="i=>selectModule(i)"
             background-color="rgb(13,152,180)" text-color="rgb(130,197,210)"
             active-text-color="#fff">
        <h4 class='title'>云行智能后台·商家版</h4>
        <el-menu-item v-for="(module,i) in modules" :index="String(i)" :key="module.name">
            {{module.title}}
        </el-menu-item>
        <div class="right-menu">
            <el-dropdown @command="switchDept" v-if="currentDept" style="vertical-align: middle">
                <span style="width: 10em;overflow:hidden;display:inline-block;cursor: pointer;color: #fff;text-align:right;">{{currentDept.name}}</span>
                <el-dropdown-menu slot="dropdown" v-if="depts.length>1">
                    <el-dropdown-item v-for="deptItem in depts" :command="deptItem" :key="deptItem.deptCode"
                                      :disabled="deptItem.deptCode===currentDept.deptCode">{{deptItem.name}} <i
                            class="el-icon-check" v-if='currentDept.deptCode === deptItem.deptCode'></i>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="right-menu-item ">
                <router-link :to="{name:'tasks.index'}" perm="dashboard.index">
                    <i class="el-icon-bell" style="color:rgb(96,98,102);font-size: 24px;font-weight: bold"></i>
                </router-link>
            </div>
            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <i class="fas fa-user-circle fa-3x"></i>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <a target='_blank' href="javascript:void(0);">
                        <el-dropdown-item>
                            {{name}}
                        </el-dropdown-item>
                    </a>
                    <el-dropdown-item divided>
                        <span @click="logout" style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script>
  import { EventBus } from '@/event-bus'
  import request from '@/utils/request'
  import {setToken} from "../../../utils/auth";

  export default {
    name: 'navbar',
    data: function() {
      return {
        availableMenus: []
      }
    },
    computed: {
      // 顶部模块
      modules() {
        const result = []
        this.availableMenus.forEach(x => {
          result.push({
            title: x.title,
            name: x.perms
          })
        })
        return result
      },
      activeModule() {
        const tab = this.$tab.info()
        let moduleIndex = '0'
        if (tab) {
          const moduleName = this.$store.state.auth.moduleByRoute[tab.component]
          moduleIndex = String(this.modules.findIndex(x => x.name === moduleName)) || '0'
        }
        return moduleIndex
      },
      // 当前组织
      currentDept() {
        return this.$store.getters.dept || {}
      },
      depts() {
        return this.$store.getters.depts
      },
      name() {
        return this.$store.getters.name
      }
    },
    created() {
      this.loadMenus()
    },
    methods: {
      loadMenus() {
        this.$store.dispatch('GetMenus').then(res => {
          this.availableMenus = res.menus
          this.selectModule(this.activeModule)
        })
      },
      selectModule(i) {
        const module = this.modules[i]
        const moduleMenus = this.availableMenus.filter(x => {
          return x.perms === module.name
        })
        const menuList = moduleMenus ? moduleMenus[0].sub : []
        EventBus.$emit('switchModule', module,menuList)
      },
      logout() {
        this.$store.dispatch('LogOut')
      },
      switchDept(dept) {
        request.post('/dept/switch', { deptCode: dept.deptCode }).then(res => {
          if (res.data.code === '0') {
            this.dept = dept
            this.$message.success('组织切换成功')
            this.$tab.closeAll()
            setToken(res.data.data.sessionToken)
            setTimeout(function() {
              window.location.reload()
              // window.location.href = '/'
            }, 1000)
          } else {
            this.$message.err(res.data.msg || '切换组织失败')
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    a:link,a:visited{
        text-decoration:none;
    }
    .title {
        float: left;
        display: inline-block;
        color: #fff;
        padding: 0px 5px 0 20px;
        width: 180px;
    }

    .title:focus {
        outline: none;
    }

    .navbar {
        /*height: 50px;*/
        /*line-height: 50px;*/
        border-radius: 0px !important;
        .right-menu {
            float: right;
            height: 100%;
            padding-top: 10px;
            &:focus {
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                margin: 0 2px;
            }
            .avatar-container {
                height: 50px;
                margin-right: 30px;
                .avatar-wrapper {
                    cursor: pointer;
                    margin-top: 5px;
                    position: relative;
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .el-icon-caret-bottom {
                        position: absolute;
                        right: -20px;
                        top: 15px;
                        font-size: 12px;
                    }
                }
            }
        }
    }

    .fa-3x {
        font-size: 1.8em;
    }
</style>
