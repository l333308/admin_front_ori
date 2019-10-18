<template>
  <div class="app-container" v-loading="loading">
    <el-form :inline="true" ref="form">
      <simple-form-item v-model="query.keyword" label="" @search="search"/>
      <el-form-item label="">
        <product-category-selector v-model="query.categoryNo"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table highlight-current-row :data="list" style="width: 100%" border stripe>
      <el-table-column
          label="图片"
          width="150" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image" height="70px">
        </template>
      </el-table-column>
      <el-table-column
          label="商品"
          width="300">
        <template slot-scope="scope">
          <p>{{scope.row.itemNo}}</p>
          <p>{{scope.row.itemName}}</p>
        </template>
      </el-table-column>
      <el-table-column
          prop="categoryName"
          label="品类"
          width="200">
      </el-table-column>
      <el-table-column
          label="属性"
          width="200">
        <template slot-scope="scope">
          <p v-for="property in scope.row.properties">
            {{property.property}}:{{property.value}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
          prop="storageCondition.name"
          label="存储条件"
          width="150">
      </el-table-column>
      <el-table-column
          label="默认价"
          width="100" prop="defaultPrice">
      </el-table-column>
      <!--<el-table-column-->
      <!--label="状态"-->
      <!--prop="statusDesc"-->
      <!--width="100">-->
      <!--</el-table-column>-->
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="can('product.updatePrice')" @click="showPriceDialog(scope.row)">批量调价</el-button>
          <el-button type="text" size="small" v-if="can('product.snapshot')" @click="showPriceLogDialog(scope.row)">调价记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :url="'/product/indexByOrder'"
                v-on:reloaded="list=>this.list=list" :params="query"
                ref="pagination" v-on:loading="val=>loading=val"/>
  </div>
</template>
<script>
import {EventBus} from '@/event-bus'
export default {
    name: "product.index",
	data () {
		return {
        loading: false,
        editDialog: false,
        showLogDialog: false,
        snapshotList: [],
        list: [],
        query: {},
        dialogQuery: {},
        data: {
            itemNo: '',
            itemName: '',
            price: ''
        },
        showSelectDialog: false,
        dialogLoading: false
    }
	},
	methods: {
      productName(val) {
		    console.warn('productName', val)
      },
      product11(val) {
          console.warn('product111', val)
      },
      onFocus1(val) {
          console.warn('onFocus1', val)
      }
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
