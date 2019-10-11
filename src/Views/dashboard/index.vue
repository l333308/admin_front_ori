<template>
    <div class="dashboard-container" v-loading="loading">
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <span class="header-title">销售数据概览</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="refresh"><i class="fas fa-sync"></i>
                </el-button>
            </div>
            <div class="card-item order-count">
                <div class="value">{{orderInfo.orderCount}}</div>
                <div class="title">今日订单总数</div>
            </div>
            <div class="card-item order-amount">
                <div class="value">{{orderInfo.orderAmount}}</div>
                <div class="title">今日销售总额(元)</div>
            </div>
            <div class="card-item avg-amount">
                <div class="value">{{orderInfo.orderAmountAvgDevice}}</div>
                <div class="title">设备平均销售(元)</div>
            </div>
        </el-card>
        <div style="padding-top:5vh"></div>
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <div class="header-title">
                    设备状态概览
                <span style="color: #169cb7">
                    （已安装设备数：<router-link :to="{name:'device.index',query:{}}" style="display: inline;" :hideIfNotAllowed="false">{{deviceInfo.totalCount}}台</router-link>
                    ，运行设备数：<router-link :to="{name:'device.index',query:{status:['RUN','BREAKDOWN','DISABLE']}}" style="display: inline;" :hideIfNotAllowed="false">{{deviceInfo.availableCount}}台</router-link>
                    ）
                </span>
                </div>
            </div>
            <div class="card-item online-count">
                <router-link :to="{name:'device.index',query:{onlineStatus:'ONLINE'}}" :hideIfNotAllowed="false">
                    <div class="value">{{deviceInfo.onlineCount}}</div>
                </router-link>
                <div class="title">在线数(台)</div>
            </div>
            <div class="card-item offline-count">
                <router-link :to="{name:'device.index',query:{onlineStatus:'OFFLINE'}}" :hideIfNotAllowed="false">
                    <div class="value">{{deviceInfo.offlineCount}}</div>
                </router-link>
                <div class="title">离线数(台)</div>
            </div>
            <div class="card-item breakdown-count">
                <router-link :to="{name:'device.index',query:{status:['BREAKDOWN']}}" :hideIfNotAllowed="false">
                    <div class="value">{{deviceInfo.breakDownCount}}</div>
                </router-link>
                <div class="title">故障数(台)</div>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        loading: false,
        orderInfo: {
          orderCount: '-',
          orderAmountAvgDevice: '-',
          deviceCount: '-',
          orderAmount: '-'
        },
        deviceInfo: {
          totalCount: '-',
          offlineCount: '-',
          onlineCount: '-',
          breakDownCount: '-'
        }
      }
    },
    methods: {
      refresh() {
        this.loading = true
        this.getStatistics()
      },
      getStatistics() {
        request.get('/dashboard').then(res => {
          this.loading = false
          this.orderInfo = res.data.orderInfo
          this.deviceInfo = res.data.deviceInfo
        }).catch(() => {
          this.loading = false
          this.$message.warning('数据刷新失败，请稍候重试')
        })
      }
    },
    created() {
      this.getStatistics()
    }
  }
</script>

<style scoped>
    .header-title {
        font-weight: bolder;
        font-size: 16px;
    }

    .card-item {
        height: 180px;
        width: 31%;
        background-color: #0D98B4;
        border-radius: 5px;
        float: left;
        margin-left: 1.7%;
        margin-bottom: 20px;
    }

    .card-item .value {
        color: white;
        font-weight: bold;
        font-size: 50px;
        padding-top: 8%;
        padding-right: 8%;
        text-align: right;
    }

    .card-item .title {
        padding-top: 3%;
        padding-right: 8%;
        text-align: right;
        font-size: 16px;
        color: #edf2fc;
    }

    .order-count {
        background: url("./backgrounds/order-count.png") no-repeat;
        background-size: 100% 100%;
        font-family: 'condensed';
    }

    .order-amount {
        background: url("./backgrounds/order-amount.png") no-repeat;
        background-size: 100% 100%;
        font-family: 'condensed';
    }

    .avg-amount {
        background: url("./backgrounds/avg-amount.png") no-repeat;
        background-size: 100% 100%;
        font-family: 'condensed';
    }

    .online-count {
        background: url("./backgrounds/online-count.png") no-repeat;
        background-size: 100% 100%;
        font-family: 'condensed';
    }

    .offline-count {
        background: url("./backgrounds/offline-count.png") no-repeat;
        background-size: 100% 100%;
        font-family: 'condensed';
    }

    .breakdown-count {
        background: url("./backgrounds/breakdown-count.png") no-repeat;
        background-size: 100% 100%;
        font-family: 'condensed';
    }
    /*@font-face {*/
        /*font-family: 'condensed';*/
        /*src: url("../../styles/iconfont/DIN_Condensed_Bold.ttf");*/
    /*}*/
</style>
