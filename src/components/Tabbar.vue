<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/record" icon="gold-coin-o">记账</van-tabbar-item>
    <van-tabbar-item replace to="/detail" icon="orders-o">明细</van-tabbar-item>
    <van-tabbar-item replace to="/Setting" icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "Tabbar",
  data(){
    return {
      active: 0,
    };
  },
}
</script>

<style scoped>
.van-tabbar{
  /*适配iPhoneX系列底部黑条*/
  padding-bottom: 15px;
}
</style>