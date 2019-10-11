<template>
    <el-pagination style="float: right;" v-show="totalCount>0&&!loading" v-if="paginationShow"
                   @current-change="setPageNo"
                   :current-page.sync="pageNo"
                   :page-size="pageSize"
                   :page-count="pageCount"
                   layout="total, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>
</template>

<script>
  import request from '@/utils/request'

  export default {
    name: 'pagination',
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      // 接口地址
      url: {
        type: String
      },
      // 搜索条件
      params: {
        type: Object
      }
    },
    data: function () {
      return {
        pageNo: 1,
        loading: false,
        totalCount: 0,
        pageCount: 0,
        paginationShow: true
      }
    },
    created: function () {
      this.search()
    },
    methods: {
      setPageNo: function (pageNo) {
        if (!(this.totalCount / this.pageSize > 1)) {
          return
        }
        this.search(pageNo)
      },
      search: function (pageNo) {
        this.paginationShow = false
        this.pageNo = pageNo || 1
        this.loading = true
        this.$emit('loading', true)
        const params = this.params || {}
        params.pageNo = this.pageNo
        params.pageSize = this.pageSize
        request({
          url: this.url,
          method: 'get',
          params: params
        }).then(resp => {
          this.loading = false
          this.$emit('loading', false)
          const data = resp.data.data
          if (resp.data.code !== '0') {
            if (resp.data.code == 500) {
              return // 统一处理
            }
            this.$message.warning(resp.data.msg || '数据加载失败..')
            // TODO:return?
          }
          this.totalCount = data.total
          this.pageSize = parseInt(data.perPage) || this.pageSize
          // 总页数
          this.pageCount = (data.total % this.pageSize) ? parseInt(data.total / this.pageSize) + 1 : data.total / this.pageSize
          // 当前页记录数
          this.currentPageSize = this.pageNo < this.pageCount ? this.pageSize : this.totalCount - this.pageSize * (this.pageCount - 1)
          this.$emit('reloaded', data.rows || [], data.total || 0)
          this.$emit('getAllData', data) // 用以获取全部数据
          this.$emit('current-change', pageNo)
          window.scrollTo(0, 0)
        })

        this.$nextTick(function () {
          this.paginationShow = true
        })
      },
      getUrl(){
          return this.url
      }
    }
  }
</script>

<style scoped>

</style>
