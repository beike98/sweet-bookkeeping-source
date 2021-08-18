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
          :value="value"
          label="日期"
          placeholder="点击选择日期"
          @click="showCalendar = true"
      />
      <van-calendar
          v-model="showCalendar"
          :min-date="mindate"
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
            :value="money1"
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
          :value="value2"
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
          v-model="remark"
          name="myRemark"
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
      radio: '-',
      value: '',
      value2: '',
      money: '',
      money1: '',
      showCalendar: false,
      remark: '',
      show: false,
      showPicker: false,
    };
  },
  methods: {
    onConfirm(date) {
      this.value = `${date.getYear()+1900}/${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    onSubmit(values) {
      if (this.value && this.money1 && this.value2) {
        this.$store.commit('createValue', values)
        this.$toast.success('记录成功')
        this.money1 = ''
        this.remark = ''
      } else {
        this.$toast.fail('未填写完成')
      }
    },
    onConfirm2(value) {
      this.value2 = value;
      this.showPicker = false;
    },
    onInput(value) {
      if (this.money1.indexOf('.') >= 0 && value === '.') {
        return
      }
      if (this.money1.length === 16) {
        return
      }
      this.money1 += value
    },
    onDelete() {
      this.money1 = this.money1.slice(0, -1)
    }
  },
  computed: {
    mindate() {
      const date = dayjs().subtract(7, 'day')
      return new Date(date.toString())
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
</style>