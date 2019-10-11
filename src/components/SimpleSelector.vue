<template>
    <el-select :placeholder="placeholder" clearable filterable @change="change" :value="value" :value-key="keyField" :disabled="disabled">
        <el-option
                v-for="item in finalItems"
                :key="item[keyField]"
                :label="item[labelField]"
                :value="valueField?item[valueField]:item">
        </el-option>
    </el-select>
</template>

<script>
  export default {
    name: 'simple-selector',
    props: {
      items: {
        required: true
      },
      value: '',
      keyField: {
        type: String,
        default: 'value'
      },
      labelField: {
        type: String,
        default: 'label'
      },
      // 传入空表示返回整个obj，否则返回obj[this.valueField]
      valueField: {
        type: String,
        default: 'value'
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data: function() {
      return {}
    },
    methods: {
      change: function(val) {
        this.$emit('change', val)
      }
    },
    computed: {
      finalItems() {
        const items = []
        if (!Array.isArray(this.items)) {
          Object.keys(this.items).forEach(x => {
            items.push({
              label: this.items[x],
              value: x
            })
          })
          return items
        }
        if (!this.items.length) {
          return this.items
        }
        // 是否为简单的列表
        const simple = !this.items[0][this.labelField]
        this.items.forEach(x => {
          if (simple) {
            items.push({
              label: x,
              value: x
            })
          } else {
            items.push(x)
          }
        })
        return items
      }
    }
  }
</script>

<style scoped>

</style>