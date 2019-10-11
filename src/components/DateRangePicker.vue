<template>
    <el-date-picker
            type="daterange"
            v-model="dateRange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            :start-placeholder="startPlaceholder"
            :end-placeholder="endPlaceholder"
            @change="change"
            style="width: 420px">
    </el-date-picker>
</template>

<script>
  export default {
    name: 'date-range-picker',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: Array
      },
      startPlaceholder:{
        type:String,
        default:'开始日期'
      },
      endPlaceholder:{
        type:String,
        default:'结束日期'
      },
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
