import Vue from "vue";
import App from "./App.vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";

Vue.config.productionTip = false;
Vue.use(VueNumberInput);

new Vue({
  render: h => h(App)
}).$mount("#app");
