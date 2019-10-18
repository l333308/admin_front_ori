<template>
  <div class="wrap">
    <input type="text" value="测试刷新用的">
    <input type="button" value="关闭当前tab" @click="closeCurrent">
    <input type="button" value="替换" @click="replaceTo">
    <h3>product.detail</h3>
    <h3>替换: this.$tab.replace()</h3>
    <div>用法同 push,不同的是 replace 是直接替换当前历史记录,所以不会产生新的历史记录</div>

    <h3>后退: this.$tab.back()</h3>
    <pre>
      接收一个正整数作为后退的步数(可选,默认是1)
    </pre>
  </div>
</template>
<script>
export default {
    name: "product.detail",
	data () {
		return {}
	},
	methods: {
        closeCurrent () {
            const current = this.$tab.info()
			this.$tab.close(current.menuId)
		},
		replaceTo () {
			this.$tab.replace('hello2?id=3&num=33', {age: 333})
		},
	},
	created () {
		console.log('当前tab:',this.$tab.info())
	},
}
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: 1200px;
    background: #f5f5f5;
    box-sizing: border-box;
  }
</style>
