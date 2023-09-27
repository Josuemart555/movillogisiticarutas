import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import axios from 'axios';
import VueAxios from 'vue-axios';
import moment from 'moment';
import jQuery from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap/dist/js/bootstrap.min';

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(VueAxios, axios);
appInstance.use(VueSweetalert2);
appInstance.use(moment);
appInstance.mount("#app");
