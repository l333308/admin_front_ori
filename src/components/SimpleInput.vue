<template>
    <el-input :placeholder="placeholder" clearable @input="change" :value="value" @keyup.enter.native="$emit('search')"/>
</template>

<script>
  export default {
    name: 'simple-input',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {},
      placeholder: {
        type: String,
        default: '请输入'
      }
    },
    methods: {
      change: function(val) {
          console.warn('simpleInput', val)
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped>

</style>