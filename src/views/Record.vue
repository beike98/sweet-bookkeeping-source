<template>
  <div>
    <van-form @submit="onSubmit">
      <!--    单选框⬇️-->
      <van-field name="myType">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal" class="radio">
            <van-radio name="-">支出</van-radio>
            <van-radio name="+">收入</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!--    日期框⬇️-->
      <van-field
          readonly
          required
          name="myDate"
          :value="myDate"
          label="日期"
          placeholder="点击选择日期"
          @click="showCalendar = true"
      />
      <van-calendar
          v-model="showCalendar"
          :min-date="mindate"
          :max-date="maxdate"
          @confirm="onConfirm"
          poppable
          safe-area-inset-bottom
          close-on-click-overlay
      />
      <!--    金额框⬇️-->
      <van-cell-group>
        <van-field
            readonly
            @touchstart.native.stop="show = true"
            name="myMoney"
            label="金额"
            :value="myMoney"
            placeholder="请输入金额"
            required
            clearable
        />
      </van-cell-group>
      <van-number-keyboard
          :show="show"
          v-model="money"
          theme="custom"
          extra-key="."
          inputmode="number"
          close-button-text="完成"
          hide-on-click-outside
          safe-area-inset-bottom
          transition
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
      />
      <!--    分类⬇️-->
      <van-field
          readonly
          clickable
          required
          name="myClass"
          label="类型"
          :value="myValue"
          placeholder="选择类型"
          @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
            show-toolbar
            :columns="tags"
            @cancel="showPicker = false"
            @confirm="onConfirm2"
        />
      </van-popup>
      <!--    备注框⬇️-->
      <van-field
          v-model="myRemark"
          name="myRemark"
          label="备注"
          placeholder="备注"
      />
      <!--    确定按钮⬇️-->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确定</van-button>
      </div>
    </van-form>
    <div class="weather">
      <Weather></Weather>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Weather from "@/components/Weather";

export default {
  name: "Record",
  components: {Weather},
  data() {
    return {
      radio: '-',
      myValue: '',
      money: '',
      myMoney: '',
      myDate:'',
      myRemark: '',
      show: false,
      showPicker: false,
      showCalendar: false
    };
  },
  methods: {
    onConfirm(date) {
      this.myDate = `${date.getYear()+1900}/${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    onSubmit(values) {
      if (this.myDate && this.myMoney && this.myValue) {
        this.$store.commit('createValue', values)
        this.$toast.success('记录成功')
        this.myMoney = ''
        this.myRemark = ''
        this.myValue = ''
      } else {
        this.$toast.fail('未填写完成')
      }
    },
    onConfirm2(value) {
      this.myValue = value;
      this.showPicker = false;
    },
    onInput(value) {
      if (this.myMoney.indexOf('.') >= 0 && value === '.') {
        return
      }
      if (this.myMoney.length === 10) {
        return
      }
      this.myMoney += value
    },
    onDelete() {
      this.myMoney = this.myMoney.slice(0, -1)
    }
  },
  computed: {
    mindate() {
      const date = dayjs().subtract(1, 'month')
      return new Date(date.toString())
    },
    maxdate() {
      return new Date()
    },
    tags(){
      return this.$store.state.tagList
    }
  },
  beforeCreate() {
    this.$store.commit('fetchTag')
  }
}
</script>

<style scoped>
.radio {
  position: absolute;
  left: 50%;
  transform: translateX(-50%)
}
.weather {
  margin-top:80px
}
</style>