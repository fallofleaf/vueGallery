import App from './App.vue'
import {createApp} from 'vue'
import {router} from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';


const app = createApp(App)
// app.config.productionTip = false;
app.use(router)
    .use(VueAxios, axios)
    .use(Antd)
    .mount('#app')
