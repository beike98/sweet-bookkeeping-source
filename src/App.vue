<template>
<div>
  <router-view></router-view>
  <TabBar></TabBar>
</div>
</template>
<script>
import TabBar from "@/components/TabBar";
export default {
  components: {TabBar}
}
</script>
<style>
body{
  background: #f7f8fa;
}
</style>