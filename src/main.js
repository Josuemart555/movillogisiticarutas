import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import axios from 'axios';
import VueAxios from 'vue-axios';
import jQuery from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(VueAxios, axios);
appInstance.mount("#app");
