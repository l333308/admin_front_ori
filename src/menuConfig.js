// 生成菜单对应的route
const viewMap = {} // TODO 权限-视图对应关系
const iconMap = {}
const whiteList = [] // 无需配置权限的路由

function genRoute(route, view, icon) {
    viewMap[route] = view
    if (icon && icon.startsWith('fa-')) {
        icon = 'fas ' + icon
    }
    icon = icon || 'fas fa-list'
    iconMap[route] = icon
}

// 首页
genRoute('dashboard.index', 'dashboard/index', 'fa-tachometer-alt')

// 品类
genRoute('category.index', 'order/index', 'fa-shopping-cart')
genRoute('category.add', 'order/add-or-edit')
genRoute('category.edit', 'order/add-or-edit')
genRoute('category.show', 'order/detail')

// 商品
genRoute('product.index', 'product/index', 'fa-shopping-cart')
genRoute('product.show', 'product/detail', 'fa-shopping-cart')
genRoute('product.add', 'product/add-or-edit')
genRoute('product.edit', 'product/add-or-edit')
genRoute('product.show', 'product/detail')

// 订单
genRoute('order.index', 'order/index', 'fa-shopping-cart')
genRoute('order.show', 'order/detail', 'fa-shopping-cart')
whiteList.push('order.index') // 只需要有认领权限即可

// 客户
genRoute('customer.index', 'customer/index', 'fa-shopping-cart')

export const ViewPathByRouteName = viewMap
export const IconByRouteName = iconMap
export const WhiteList = whiteList

// 一些详情页面的动态标题
export const TitleByRouteName = {
    'order.show': function (query) {
        const orderNo = query && query.orderNo
        if (orderNo) {
            return '订单详情(' + orderNo + ')'
        }
        return '订单详情'
    },
    'order.audit': function () {
      return '审单'
    },
    'product.show': function (query) {
        return '商品详情' // TODO
    },
    'device.show': function (query) {
        const deviceNo = query && query.deviceNo
        if (deviceNo) {
            return '设备(' + deviceNo + ')详情'
        }
        return '设备详情'
    },
    'tasks.index':function () {
        return '我的任务'
    }
}

