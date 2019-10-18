<template>
    <el-cascader
            placeholder="选择商品类别(支持搜索)"
            :options="categories"
            filterable clearable
            :change-on-select="changeOnSelect"
            @change="change"
            :value="value"
            :disabled="disabled"
    />
</template>

<script>
  import request from '@/utils/request'

  export default {
    name: 'product-category-selector',
    props: {
      changeOnSelect: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Array,
        default: function() {
          return []
        }
      },
      // 最多层级
      maxLevel: {
        type: Number
      }
    },
    created: function() {
      this.loadData()
    },
    data: function() {
      return {
        categories: []
        // value: ''
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods: {
      change: function(val) {
        this.$emit('change', val)
      },
      loadData: function() {
        const url = '/productCategory/tree'
        const query = {}
        if (this.maxLevel) {
          query.maxLevel = this.maxLevel
        }
        request.get(url, { params: query }).then(resp => {
          this.categories = resp.data
        })
      },
      reload: function() {
        this.loadData()
      }
    }
  }
</script>

<style scoped>

</style>