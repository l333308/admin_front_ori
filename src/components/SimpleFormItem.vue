<template>
    <el-form-item :label="label">
        <simple-input :placeholder="placeholder" @change="change" :value="value" @search="$emit('search')"/>
    </el-form-item>
</template>

<script>
  export default {
    name: 'simple-form-item',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {},
      placeholder: {
        type: String,
        default: '请输入'
      },
      label: {}
    },
    methods: {
      change: function(val) {
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped>

</style>