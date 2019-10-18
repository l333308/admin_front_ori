export default {
	// 列表配置
	// 菜单列表
	menu: [
		{
			title: '品类',            // 一级菜单名称
			icon: 'el-icon-location',   // 一级菜单 icon
			menuId: 'category',                // 索引(必须唯一，是字符串)
			sub: [                      // 子菜单(二级菜单)
				{
					title: '品类管理',      // 菜单名称
					component: 'category.index',    // 点击菜单打开的组件名称
					menuId: 'category.index',           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
                    show: true
				}
			]
		},

		{
			title: '商品',
			icon: 'el-icon-menu',
			menuId: 'product',
			sub: [
				{title: '商品列表', component: 'product.index', menuId: 'product.index', show: true},
				{title: '商品详情', component: 'product.detail', menuId: 'product.detail'},
				{title: '新增商品', component: 'product.add', menuId: 'product.add'},
				{title: '编辑商品', component: 'product.edit', menuId: 'product.edit'},
			]
		},

		{
			title: '订单',
			icon: 'el-icon-document',
			menuId: 'order',
			sub: [
				{title: '订单列表', component: 'order.index', menuId: 'order.index', show: true},
				{title: '订单详情', component: 'order.detail', menuId: 'order.detail'}
			]
		},

		{
			title: '客户',
			icon: 'el-icon-setting',
			menuId: 'customer',
			sub: [
				{title: '客户列表', component: 'customer.index', menuId: 'customer.index', show: true},
				{title: '客户详情', component: 'customer.detail', menuId: 'customer.detail'}
			]
		},
	],
	// 收藏列表  字段说明同 [菜单列表]
	favor: [
		{title: '子菜单1-1', component: 'hello1', menuId: '1-1'},
		{title: '子菜单1-2', component: 'hello2', menuId: '1-2'},
		{title: '子菜单1-3', component: 'hello3', menuId: '1-3'},
		{title: '子菜单2-1', component: 'hello1', menuId: '2-1'},
		{title: '子菜单2-2', component: 'hello2', menuId: '2-2'},
		{title: '子菜单2-3', component: 'hello3', menuId: '2-3'}
	],

	// 应用列表
	application: [
		{
			title: '应用1：组件管理',
			divided: false,
			url: '/',
		},
		{
			title: '应用2：注册证管理',
			divided: false,
			url: '/',
		},
		{
			title: '应用3：产品管理',
			divided: false,
			url: '/',
		},
		{
			title: '返回应用中心',        // 显示名称
			divided: true,              // 分割线
			url: 'http://www.baidu.com', // 跳转地址
			icon: 'el-icon-arrow-left'  // 图标（可选）
		}
	],

	// 主页 tab 配置
	homeTab: {
		title: '首页',                     //  tab 显示标题
		menuId: 'home',                   //  tab 内部名称(用来识别当前打开的tab)
		components: [{path: 'home'}],     //  tab 对应的组件
	}
}
