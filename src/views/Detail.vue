<template>
  <div>
    <ul v-if="Object.keys(result).length!==0">
      <li v-for="(value,name,index) in result" :key="index">
        <div class="title">{{ name }}</div>
        <div>
          <ul>
            <li v-for="(item,index) in value" :key="index" class="item">
              {{ item.myClass }}<span class="remark">{{ item.myRemark }}</span>
              <span class="money">{{ item.myType }}{{ item.myMoney }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div v-else class="else">暂时没有记录哦～</div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Detail",
  computed: {
    values() {
      return this.$store.state.valueList
    },
    result() {
      const myValues = this.values
      const values = myValues.sort((a, b) => {
        return dayjs(b.myDate).valueOf() - dayjs(a.myDate).valueOf()
      })
      const hashTable = {}
      for (let i = 0; i < values.length; i++) {
        const date = values[i].myDate
        hashTable[date] = hashTable[date] || []
        /* 将date作为hashTable的key，往里面push每一项value值。
        如果遇到date相同，那就push到相同的key里面。 */
        hashTable[date].push(values[i])
      }
      return hashTable
    }
  },
  beforeCreate() {
    this.$store.commit('fetchValue')
  }
}
</script>

<style scoped>
.title {
  background: #f7f8fa;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  padding-left: 10px;
}

.item {
  border-bottom: 1px solid #f1f1f1;
  padding: 8px 15px;
}

.money {
  display: inline-block;
  float: right;
}

.else {
  margin-top: 80px;
  text-align: center;
  color: #c8c9cc;
}

.remark {
  color: #123456;
  padding-left: 5px;
  font-size: 14px;
}
</style>