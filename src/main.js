import Vue from "vue";

/**
 * Config & Plugins
 */
import router from "./router";
import store from "./store";
import './plugins/axios'

/**
 * Main Component
 */
import App from "./App.vue";

/**
 * Vue-Tables-2
 */
import { ClientTable, DatatableOptions } from 'vue-tables-2'
Vue.use(ClientTable, DatatableOptions, false, 'bootstrap4', 'default');

/**
 * Paginaction extra
 */
import Paginate from 'vuejs-paginate';

Vue.component('paginate', Paginate);

/**
 * Validation
 */
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

/**
 * Instance Vue
 */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
