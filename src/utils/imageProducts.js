// 某张图片的商品: code=>qty
export function formatImageItems(items) {
  const result = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const code = item.code
    if (code) {
      result[code] = item.actualQty || 0
    }
  }
  return result
}

// 两张图片的差异
export function getDiffQuantities(before, after) {
  const result = {}
  Object.values(before).forEach(product => {
    const code = product.code
    if (!result[code]) {
      result[code] = 0
    }
    result[code] += product.qty
  })
  Object.values(after).forEach(product => {
    const code = product.code
    if (!result[code]) {
      result[code] = 0
    }
    result[code] -= product.qty
  })
  return result
}

export function getDiffProducts(before, after) {
  const productByCode = {}
  before.forEach(x => {
    productByCode[x.code] = x
  })
  after.forEach(x => {
    productByCode[x.code] = x
  })
  const diff = getDiffQuantities(before, after)
  console.log('diff', diff)
  const result = []
  for (const code in diff) {
    const qty = diff[code]
    const product = productByCode[code]
    var newProduct = {}
    Object.keys(product).forEach(function(key) {
      newProduct[ key ] = product[ key ]
    })
    newProduct.qty = qty
    result.push(newProduct)
  }
  return result
}

// code=>qty
export function getQtyByCode(products) {
  const result = {}
  products.forEach(x => {
    if (x.code) {
      result[x.code] = x.qty
    }
  })
  return result
}
