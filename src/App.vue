<template>
<div>
  <router-view></router-view>
  <Tabbar></Tabbar>
</div>
</template>
<script>
import Tabbar from "@/components/Tabbar";
export default {
  components: {Tabbar}
}
</script>
<style>
body{
  background: #f7f8fa;
}
</style>