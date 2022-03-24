<template>
  <div class="title">
    <div class="left">
      <slot></slot>
    </div>
    <router-link class="right"
                 :to="`/${path}`"
                 tag="div">
      <span>更多</span>
      <i class="fa fa-angle-right"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['path']
}
</script>

<style lang="less" scoped>
.title {
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  margin: 0 15px;
  .left {
    font-size: 16px;
    font-weight: bold;
  }
  .right {
    span {
      font-size: 14px;
      padding-right: 5px;
    }
    i {
      font-size: 16px;
    }
  }
}
</style>