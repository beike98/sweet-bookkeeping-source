<template>
  <div>
    <div>
      <van-cell-group inset class="header">
        <van-cell
            :title="title"
            @click="showPopup"
            icon="calendar-o"
            class="header-content"
        />
      </van-cell-group>
      <van-popup v-model="show" round position="bottom" :style="{ height: '42%' }">
        <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="onConfirm"
            @cancel="onCancel"
        />
      </van-popup>
    </div>
    <div class="total">本月共计：{{ total }}</div>
    <div v-if="Object.keys(result).length!==0">
      <ul>
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
    </div>
    <div v-else class="else">暂时没有记录哦～</div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Detail",
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      title: `${new Date().getFullYear()}/${new Date().getMonth() + 1}`
    };
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    showPopup() {
      this.show = true;
    },
    onConfirm(date) {
      this.title = `${date.getYear() + 1900}/${date.getMonth() + 1}`;
      this.show = false;
    },
    onCancel() {
      this.show = false;
    }
  },
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
        /* 1、将date作为hashTable的key，往里面push每一项value值。
        2、如果遇到date相同，那就push到相同的key里面。
        3、如果发现date和title相同，那就展示，否则不展示。 */
        if (date.indexOf(this.title) !== -1) {
          hashTable[date] = hashTable[date] || []
          hashTable[date].push(values[i])
        }
      }
      return hashTable
    },
    total() {
      let totalArr = []
      let total = 0
      //先遍历对象，把每一天的money找到，再遍历数组，把每一天的money相加。
      for(let i in this.result){
        totalArr = this.result[i]
        for(let i = 0; i< totalArr.length; i++){
          total+=(parseInt(totalArr[i].myType + ((totalArr[i].myMoney)*1000000000)))
        }
      }
      return (total/1000000000).toFixed(2)
    }
  },
  beforeCreate() {
    this.$store.commit('fetchValue')
  }
}
</script>

<style scoped>
.title {
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
  font-family: monospace;
}

.else {
  margin-top: 80px;
  text-align: center;
  color: #c8c9cc;
}

.remark {
  color: #323233;
  padding-left: 5px;
  font-size: 14px;
}

.header {
  width: 33.33%;
  margin: 5px auto;
}

.header-content {
  font-size: 14px;
}

.total {
  padding-left: 5px;
}
</style>