<template>
  <div>
    <van-form @submit="onSubmit">
      <!--    单选框⬇️-->
      <van-field name="收支类型">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal" class="radio">
            <van-radio name="支出">支出</van-radio>
            <van-radio name="收入">收入</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!--    日期框⬇️-->
      <van-field
          readonly
          clickable
          required
          name="日期"
          :value="value"
          label="日期"
          placeholder="点击选择日期"
          @click="showCalendar = true"
          error
      />
      <van-calendar v-model="showCalendar" :min-date="mindate" @confirm="onConfirm"/>
      <!--    金额框⬇️-->
      <van-cell-group>
        <van-field
            @touchstart.native.stop="show = true"
            readonly
            clickable
            name="金额"
            label="金额"
            :value="money"
            placeholder="请输入金额"
            required
            error/>
      </van-cell-group>
      <van-number-keyboard
          :show="show"
          v-model="money"
          theme="custom"
          extra-key="."
          close-button-text="完成"
          hide-on-click-outside
          safe-area-inset-bottom
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
      />
      <!--    分类⬇️-->
      <van-field
          readonly
          clickable
          required
          error
          name="类型"
          label="类型"
          :value="value2"
          placeholder="选择类型"
          @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm2"
        />
      </van-popup>
      <!--    备注框⬇️-->
      <van-field
          v-model="remark"
          name="备注"
          label="备注"
          placeholder="备注"
      />
      <!--    确定按钮⬇️-->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: "Record",
  data() {
    return {
      radio: '支出',
      value: '',
      value2: '',
      money: '',
      showCalendar: false,
      remark: '',
      show: false,
      showPicker: false,
      columns: ['吃饭', '衣服', '美容', '电子产品', '交通', '房租', '电话费', '工资'],
    };
  },
  methods: {
    onConfirm(date) {
      this.value = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    onSubmit(values) {
      console.log('submit', values);
    },
    onInput(value) {
      console.log(value)
    },
    onDelete() {
      console.log('删除')
    },
    onConfirm2(value) {
      this.value2 = value;
      this.showPicker = false;
    },
  },
  computed: {
    mindate() {
      const date = dayjs().subtract(7, 'day')
      return new Date(date.toString())
    }
  }
}
</script>

<style scoped>
.radio {
  position: absolute;
  left: 50%;
  transform: translateX(-50%)
}
</style>