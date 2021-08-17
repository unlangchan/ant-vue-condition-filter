import Vue from "vue";
import App from "./App.vue";

import components from "./components";

Vue.config.productionTip = false;

components.forEach((component) => {
  Vue.component(component.name, component);
});

new Vue({ render: (h) => h(App) }).$mount("#app");
