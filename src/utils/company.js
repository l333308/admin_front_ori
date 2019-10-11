import request from './request'
import { Message } from 'element-ui'
// import Vue from 'vue'

const company = {
  map: {
    box: 1, // 柜机
    led: 2, // led
    innerCamera: 3, // 柜内摄像头
    outerCamera: 4, // 环境摄像头
    algorithm: 5, // 算法
    compressor: 6, // 压缩机
    evaporate: 7, // 蒸发风机
    condensation: 8, // 冷凝风机
    switch: 9, // 开关电源
    extension: 10, // 电源扩展
    communication: 11, // 通讯模块
    lockingPlate: 12, // 锁控板
    electricMortiseLock: 13, // 电插锁
    switchboard: 14, // 交换机
    ammeter: 15, // 电表
    motherboard: 16 // 主板

  },
  add(type, companyName) {
    return new Promise((resolve, reject) => {
      request.post('/comb/addCompanys', { type: this.map[type], companyName: companyName }).then(res => {
        if (res.data.code === '0') {
          Message({
            type: 'success',
            message: '添加成功'
          })
          resolve(true)
        } else {
          Message.error(res.data.msg || '添加失败，请稍后重试')
        }
      })
    })
  }
}

export default company
