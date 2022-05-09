import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import NavBar from "./components/NavBar.vue";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import router from "./router";
import "vue2-animate/dist/vue2-animate.min.css";
import store from "./store";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("en", en);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Creating global component: NavBar
Vue.component("NavBar", NavBar);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
