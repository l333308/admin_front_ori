<template>

</template>

<script>
  import { removeToken, setToken } from '@/utils/auth'
  import { getUserInfo } from '@/api/login'

  export default {
    name: 'login-callback',
    created: function() {
      const URLSearchParams = require('url-search-params')
      const urlParams = new URLSearchParams(window.location.hash.substr(1).split('/ssoCallback')[1])
      const token = urlParams.get('token')
      // const token = this.$route.query.token
      if (!token || token === 'undefined') {
        this.$message.warning('参数错误')
        // window.location.href = '/login'
        return
      }
      let user = null
      let msg = '会话失效!'
      // // 根据token获取用户信息
      getUserInfo(token).then(resp => {
        console.log('getting user info', resp.data)
        if (resp.data.code === '0') {
          user = resp.data.data
        } else {
          msg = resp.data.msg
        }
        console.log('user info', user)

        if (!user) {
          this.$message.warning(msg)
          removeToken()
          // window.location.href = '/login'
        } else {
          setToken(user.sessionToken)
          this.$message.success('登录成功!')
          window.location.href = '/'
        }
      })
    }
  }
</script>

<style scoped>

</style>