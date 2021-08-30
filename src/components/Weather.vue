<template>
<div>
  当前城市为：{{ address }}
  <ul v-for="(item,index) in weatherList" :key="index">
    <li>{{item.week}}/{{item.weather}}/{{item.lowest}}~{{item.highest}}</li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Weather",
  data(){
    return{
      address:'北京市',
      weatherList:[]
    }
  },
  mounted() {
    axios
        .get('https://apis.map.qq.com/ws/location/v1/ip?key=S7HBZ-TZGC5-VHHIY-QUZTD-LSBRV-7HFYO')
        .then(response => (this.address = response.result.ad_info.city))
        .catch(error => console.log(error))
    axios
        .get('http://api.tianapi.com/txapi/tianqi/index?key=d8b1d9f508ff5ab3703953683d5894a1&city='+this.address)
        .then(response => (this.weatherList = response.data.newslist))
  }
}
</script>

<style scoped>

</style>