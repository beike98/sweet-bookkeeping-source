<template>
  <div>
    <van-cell title="选择日期区间" :value="date" @click="show = true"/>
    <van-calendar v-model="show" type="range" @confirm="onConfirm" allow-same-day/>
    <div style="margin-top: 10px">
      <div class="title">
        <van-row>
          <van-col span="1"></van-col>
          <van-col span="9">2021/8/17</van-col>
          <van-col span="9"></van-col>
          <van-col span="5">-1,111</van-col>
        </van-row>
      </div>
      <div class="item">
        <van-row>
          <van-col span="1"></van-col>
          <van-col span="9">吃饭（满汉全席）</van-col>
          <van-col span="10"></van-col>
          <van-col span="4">-1,111</van-col>
        </van-row>
      </div>
      <div class="item">
        <van-row>
          <van-col span="1"></van-col>
          <van-col span="9">吃饭（满汉全席）</van-col>
          <van-col span="10"></van-col>
          <van-col span="4">-1,111</van-col>
        </van-row>
      </div>
      <div class="item">
        <van-row>
          <van-col span="1"></van-col>
          <van-col span="9">吃饭（满汉全席）</van-col>
          <van-col span="10"></van-col>
          <van-col span="4">-1,111</van-col>
        </van-row>
      </div>
    </div>
    {{this.$store.state.valueList}}
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      date: '',
      show: false,
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getYear() + 1900}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
  },
}
</script>

<style scoped>
.title {
  background: #f7f8fa;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
}

.item {
  border-bottom: 1px solid #f1f1f1;
  padding: 2px;
}
</style>