<template>
    <div class="app-container" v-loading="loading">

        <span>product.edit</span>
    </div>
</template>

<script>
    export default {
        name: "product.edit",
        data: function () {
            return {
                loading: false,
                floorCount: 4, // TODO
                productMap: {}, // 用到的商品
                id: '',
                algorithmModels:[],
                algorithmModel: {}, // 暂时只允许选择一个算法模型
                baseInfo: {}, // 模板基础信息
                detailsByFloor: {},
                productsByModel: {},
                currentFloor: 1,
                productDialog: false,
                dialogLoading: false,
                conflictProductMap: {},
                // 不能选择的商品集(根据detailsByFloor和conflictProductMap)
                canNotSelectProductMap: [],
                selectedProducts: {}, // 设备已选中的商品集 互斥校验用
            }
        },
        computed: {

        },
        methods: {

        },
        created() {

        },
        watch: {

        }
    }
</script>

<style scoped>
</style>
