<template>
    <el-date-picker
            type="datetimerange"
            v-model="dateRange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="change"
            style="width: 100%">
    </el-date-picker>
</template>

<script>
  export default {
    name: 'datetime-range-picker',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: Array
      }
    },
    data: function() {
      return {
        dateRange: ''
      }
    },
    created: function() {
      if (this.value && this.value[0] && this.value[1]) {
        this.dateRange = this.value
        this.change(this.value)
      }
    },
    methods: {
      change: function(val) {
        if (!val) {
          val = ['', '']
        }
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped>
</style>