<template>
  <div>
    <van-nav-bar title="标签设置"/>
    <van-swipe-cell :before-close="beforeClose">
      <van-cell :border="false" title="购物" />
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "Setting.vue",
  methods: {
    beforeClose({ position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
  },
}
</script>

<style scoped>

</style>