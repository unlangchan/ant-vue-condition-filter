<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://unpkg.com/ant-design-vue@1.7.3/dist/antd.css"
    />
    <condition-filter
      :title="title"
      :options="options"
      :placeholder="placeholder"
      @change="change"
      style="min-width: 250px; --title-word: 4.1"
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
      title: "Condition",
      placeholder: "Unlimited",
      options: [
        {
          title: "Sex",
          value: undefined,
          key: "sex",
          options: [
            { title: "Men", value: "men" },
            { title: "Women", value: "women" },
          ],
        },
        {
          title: "Status",
          value: undefined,
          key: "status",
          options: [
            { title: "Disable", value: "0" },
            { title: "Enable", value: "1" },
            { title: "Deleted", value: "-1" },
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
