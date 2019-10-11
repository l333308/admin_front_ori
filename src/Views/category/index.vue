<template>
  <div class="wrap">
    <input type="text" value="品类-index">
    <input type="button" value="跳转" @click="goto">
    <input type="button" value="替换" @click="replaceTo">
  </div>
</template>
<script>
export default {
    name: "category.index",
	data () {
		return {}
	},
	methods: {
		goto () {
			this.$tab.push('hello2?id=1&num=2', {age: 188})
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
