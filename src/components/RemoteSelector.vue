<template>
    <el-select :placeholder="placeholder" clearable filterable @change="change" :value="value" :value-key="keyField"
               :disabled="disabled" :multiple="multiple">
        <el-option
            v-for="item in items"
            :key="keyField?item[keyField]:item"
            :label="formatter?formatter(item):(labelField?item[labelField]:item)"
            :value="valueField?item[valueField]:item">
        </el-option>
    </el-select>
</template>

<script>
    import request from '@/utils/request'

    export default {
        name: 'remote-selector',
        props: {
            value: '',
            url: {
                type: String
            },
            keyField: {
                type: String
            },
            labelField: {
                type: String
            },
            valueField: {
                type: String
            },
            formatter: {
                type: Function
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiple:{
                type: Boolean,
                default: false
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data: function () {
            return {
                items: []
            }
        },
        created: function () {
            this.fetch()
        },
        methods: {
            change: function (val) {
                this.$emit('change', val)
            },
            fetch() {
                request.get(this.url).then(resp => {
                    this.items = resp.data
                    this.$emit('loaded', resp.data)
                })
            },
            reload() {
                this.fetch()
            }
        },
        watch:{
            url(){
                this.reload()
            }
        }
    }
</script>

<style scoped>

</style>
