<template>
  <div class="ant-condition-filter">
    <div
      class="ant-select ant-select-enabled"
      @click="click"
      :class="className"
    >
      <div class="ant-select-selection ant-select-selection--single">
        <div class="ant-select-selection__rendered">
          <div class="ant-condition-filter-title">
            <span>{{ title }}</span>
            <span class="ant-condition-filter-title-append">:</span>
          </div>
          <div
            class="ant-select-selection-selected-value"
            :title="text"
            v-if="hasValue"
          >
            {{ text }}
          </div>
          <div class="ant-select-selection__placeholder" v-else>
            {{ placeholder }}
          </div>
        </div>
        <span class="ant-select-arrow">
          <i class="anticon anticon-down ant-select-arrow-icon">
            <svg
              viewBox="64 64 896 896"
              data-icon="down"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              class=""
            >
              <path
                d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
              ></path>
            </svg>
          </i>
        </span>
      </div>
    </div>
    <div class="ant-select-dropdown" v-show="toggleOpen">
      <div
        class="ant-select-dropdown-content"
        style="overflow: auto; transform: translateZ(0px)"
      >
        <ul
          class="
            ant-select-dropdown-menu
            ant-select-dropdown-menu-vertical
            ant-select-dropdown-menu-root
          "
        >
          <li
            class="ant-select-dropdown-menu-item-group"
            v-for="group of options"
            :key="group.key"
          >
            <div class="ant-select-dropdown-menu-item-group-title">
              <span>{{ group.title }}</span>
            </div>
            <div class="ant-radio-group">
              <label
                class="ant-radio-wrapper"
                v-for="option of group.options"
                :key="option.value"
              >
                <span
                  class="ant-radio"
                  :class="{
                    'ant-radio-checked': group.value === option.value,
                  }"
                >
                  <input
                    type="radio"
                    class="ant-radio-input"
                    :name="group.key"
                    @click="change($event, option, group, options)"
                  />
                  <span class="ant-radio-inner"></span>
                </span>
                <span>{{ option.title }}</span>
              </label>
            </div>
          </li>
          <div class="ant-empty" v-show="options.lenght === 0">
            <p class="ant-empty-description">暂无数据</p>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ant-vue-condition-filter",
  props: {
    title: {
      type: String,
      default: "筛选",
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: "不限",
    },
  },
  data() {
    return {
      mockFocused: false,
      disabled: false,
      toggleOpen: false,
      hasValue: false,
      text: "",
      className: {
        ["ant-select-focused"]: false,
        ["ant-select-open"]: false,
      },
    };
  },
  methods: {
    click() {
      if (!this.disabled) {
        this.setMockFocused(!this.mockFocused);
      }
    },
    setMockFocused(bool) {
      this.mockFocused = bool;
      this.toggleOpen = bool;
      this.className = {
        ["ant-select-focused"]: bool,
        ["ant-select-open"]: bool,
      };
    },
    change(event, option, group, options) {
      if (group.value === option.value) {
        group.value = undefined;
      } else {
        group.value = option.value;
      }
      let { text, filter } = this.setText(options);
      this.$emit("update:options", options);
      this.$emit("change", { text, filter, options });
    },
    setText(options) {
      let text = "";
      let filter = {};
      options.forEach(({ title, value, options, key }) => {
        if (value !== undefined) {
          let valueText = options.find(
            (option) => option.value === value
          ).title;
          text += `${title}:${valueText}、`;
          filter[key] = value;
        } else if (filter[key]) {
          delete filter[key];
        }
      });
      this.hasValue = text !== "";
      this.text = text = text.slice(0, -1);
      return { text, filter };
    },
  },
};
</script>

<style scoped lang="scss">
.ant-condition-filter {
  --title-word: 2;
  position: relative;
  display: inline-block;
}
.ant-select {
  width: 100%;
}
.ant-select-selection__rendered {
  margin-left: calc(10px + 1em * var(--title-word));
}
.ant-condition-filter-title {
  position: absolute;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  margin-left: calc(-10px - 1em * var(--title-word));
}
.ant-condition-filter-title-append {
  user-select: none;
}
.ant-select-dropdown {
  top: auto;
  left: auto;
  margin-top: 2px;
  min-width: 100%;
  * {
    user-select: none;
  }
}
.ant-select-dropdown-menu-item-group {
  padding-bottom: 1em;
}
.ant-radio-group {
  padding-left: 20px;
  padding-right: 20px;
}
.ant-radio-wrapper {
  margin-right: 0;
  transform: scale(0.9);
  min-width: 60px;
}
</style>
