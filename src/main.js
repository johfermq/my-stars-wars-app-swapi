import Vue from "vue";

/**
 * Config & Plugins
 */
import router from "./router";
import store from "./store/index";
import './plugins/axios';
import './plugins/vue-tables-2';
import './plugins/vuelidate';

/**
 * Main Component
 */
import App from "./App.vue";

/**
 * Instance Vue
 */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
