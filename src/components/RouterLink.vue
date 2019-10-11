<template>
    <span @click="openLink" class="link" v-if="can(actualPerm)">
        <slot></slot>
    </span>
    <span v-else-if="!hideIfNotAllowed">
        <slot></slot>
    </span>
</template>

<script>
  // 兼容<router-link>
  export default {
    name: 'router-link',
    props: {
      to: {
        type: Object
      },
        // 没有权限时默认隐藏
      hideIfNotAllowed: {
        type: Boolean,
        default: true
      },
      // 指定对应的权限，而不是用route.name
      perm:{
          type:String
      }
    },
      computed:{
        actualPerm:function () {
            return this.perm||this.to.name
        }
      },
    methods: {
      openLink() {
        this.$router.push(this.to,this.actualPerm)
      }
    }
  }
</script>

<style scoped>
    .link:hover {
        cursor: pointer;
    }
</style>
