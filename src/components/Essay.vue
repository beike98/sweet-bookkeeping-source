<template>
<div>
  网络随笔：{{message.content}}——{{message.origin}}
</div>
</template>

<script>

export default {
  name: "Essay",
  data(){
    return{
      message:{}
    }
  },
  mounted() {
    this.$axios
        .get('https://api.xygeng.cn/one')
        .then(response => (this.message = response.data.data))
  }
}
</script>

<style scoped>
div{
  padding: 10px;
  color: #d3d3d3;
}
</style>