// import Vue from "vue";

const route = Object.create(null)

import { ViewPathByRouteName } from '../menuConfig'

route.install = function (vue) {
  // 第一个字符串是 组件名，第二个是组件路径，第三个是包名(如果不指定则已1.js,2.js....n.js命名)
	vue.component('home', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/home.vue')), 'home')})
	vue.component('index', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/index.vue')), 'index1')})

	// 品类
	vue.component('category.index', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/category/index.vue')), 'category.index')})

	// 商品
	vue.component('product.index', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/product/index.vue')), 'product.index')})
	vue.component('product.detail', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/product/detail.vue')), 'product.detail')})
	vue.component('product.add', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/product/add.vue')), 'product.add')})
	vue.component('product.edit', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/product/edit.vue')), 'product.edit')})

	// 订单
	vue.component('order.index', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/order/index.vue')), 'order.index')})
	vue.component('order.detail', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/order/detail.vue')), 'order.detail')})

	// 客户
	vue.component('customer.index', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/customer/index.vue')), 'customer.index')})
	vue.component('customer.detail', (resolve) => {require.ensure([], ()=>resolve(require('@/Views/customer/detail.vue')), 'customer.detail')})
}


export default route