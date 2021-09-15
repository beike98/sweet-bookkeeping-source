<template>
  <div>
    <router-view></router-view>
    <IsPC v-if="isPC"></IsPC>
    <TabBar></TabBar>
  </div>
</template>
<script>
import TabBar from "@/components/TabBar";
import IsPC from "@/components/IsPC";
export default {
  components: { TabBar, IsPC },
  data() {
    return {
      isPC: false,
    };
  },
  mounted() {
    if (document.body.clientWidth > 500) {
      this.isPC = true;
    }
  },
};
</script>
<style>
body {
  background: #f7f8fa;
}
</style>