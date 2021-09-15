<template>
  <div>
    <van-nav-bar title="标签设置" />
    <van-swipe-cell
      :before-close="beforeClose"
      v-for="(tag, index) in tags"
      :key="index"
    >
      <van-cell :border="false" :title="tag" value=">" />
      <template #right>
        <van-button square type="danger" text="删除" @click="getIndex(index)" />
      </template>
    </van-swipe-cell>
    <van-button type="info" class="addTag" @click="addTag">添加标签</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, SwipeCell, Dialog } from "vant";

Vue.use(NavBar);
Vue.use(SwipeCell);
Vue.use(Dialog);
export default {
  name: "Setting.vue",
  data() {
    return {
      index: -1,
    };
  },
  methods: {
    beforeClose({ position, instance }) {
      switch (position) {
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除吗？",
            })
            .then(() => {
              this.$store.commit("removeTag", this.index);
            });
          break;
      }
    },
    addTag() {
      const newTag = prompt("请输入新标签名称");
      if (newTag !== "" && newTag !== null) {
        this.$store.commit("createTag", newTag);
      }
    },
    getIndex(index) {
      this.index = index;
    },
  },
  computed: {
    tags() {
      return this.$store.state.tagList;
    },
  },
  beforeCreate() {
    this.$store.commit("fetchTag");
  },
};
</script>

<style scoped>
.addTag {
  display: table;
  margin: 20px auto;
}
</style>