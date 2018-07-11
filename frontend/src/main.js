import Vue from "vue";
import VueResource from "vue-resource";
import VueSocketio from "vue-socket.io";
import App from "./App.vue";

Vue.use(VueResource);
Vue.use(VueSocketio, "http://127.0.0.1:3000/"); //这里的url是后台提供的socket的地址

new Vue({
  el: "#app",
  render: h => h(App)
});
