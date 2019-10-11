<template>
    
</template>

<script>
  export default {
    created: function() {
      this.ssoLogin()
    },
    methods: {
      ssoLogin: function() {
        const redirect = process.env.SSO_URL + '/user/login?ref=' + encodeURIComponent(window.location.protocol + '//' + window.location.host + '/#/ssoCallback')// 跳到首页，然后自动重定向到sso登录页面;
        if (process.env.NODE_ENV === 'development') {
          window.location.href = redirect
        } else {
          window.location.href = redirect
        }
      }
    }
  }
</script>

<style scoped>

</style>