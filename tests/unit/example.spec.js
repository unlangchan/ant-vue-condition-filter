import { shallowMount } from "@vue/test-utils";
import ConditionFilter from "@/components/ConditionFilter.vue";
import { getWords } from "../utils";

describe("ConditionFilter.vue", () => {
  it("no filter condition", () => {
    const wrapper = shallowMount(ConditionFilter, {
      propsData: {},
    });
    expect(getWords(wrapper.find(".ant-select"))).toEqual("筛选:不限");
  });

  it("Has filter condition", async () => {
    const title = "条件";
    const options = [
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
    ];

    const wrapper = shallowMount(ConditionFilter, {
      propsData: {
        title,
        options,
      },
    });
    expect(getWords(wrapper.find(".ant-select"))).toEqual("条件:不限");
    await wrapper.findAll("[name='sex']").at(0).trigger("click");
    await wrapper.findAll("[name='status']").at(1).trigger("click");
    expect(getWords(wrapper.find(".ant-select"))).toEqual(
      "条件:性别:男、状态:启用"
    );
  });
});
