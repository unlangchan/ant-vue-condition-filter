<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://unpkg.com/ant-design-vue@1.7.3/dist/antd.css"
    />
    <condition-filter
      :title="title"
      :options="options"
      @change="change"
      style="width: 220px"
    ></condition-filter>
  </div>
</template>
<script>
import { ConditionFilter } from "ant-vue-condition-filter";
export default {
  components: {
    ConditionFilter,
  },
  data() {
    return {
      title: "条件",
      options: [
        {
          title: "性别",
          value: undefined,
          key: "sex",
          options: [
            { title: "男", value: "男" },
            { title: "女", value: "女" },
          ],
        },
        {
          title: "状态",
          value: undefined,
          key: "status",
          options: [
            { title: "禁用", value: "0" },
            { title: "启用", value: "1" },
            { title: "已删", value: "-1" },
          ],
        },
      ],
    };
  },
  methods: {
    change(e) {
      console.log("$event", e);
      console.log("options", this.options);
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  padding: 20px;
}
</style>
