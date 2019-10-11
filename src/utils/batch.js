// 获取指定门店的信息
export async function getStoreList(storeListStr) {
    return new Promise((resolve, reject) => {
        request({url: '/store/batchGet', method: 'get', params: {storeListStr}}).then(res => {
            if (res.data.code == 0) {
                resolve(res.data.data || [])
            } else {
                reject(res.data.msg || '获取门店数据失败')
            }
        })
    })
}

// 获取指定商品的信息
export async function getProductList(productListStr) {
    return new Promise((resolve, reject) => {
        request({url: '/product/batchGet', method: 'get', params: {productListStr}}).then(res => {
            if (res.data.code == 0) {
                const rows = res.data.data || []
                // TODO:按productListStr排序？
                rows.sort(function (a, b) {
                    return a.itemNo > b.itemNo ? 1 : -1;
                })
                resolve(rows)
            } else {
                reject(res.data.msg || '获取商品数据失败')
            }
        })
    })
}
