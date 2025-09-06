import { createApp } from "vue";
import router from "./router";
import "./style.css";
import App from "./App.vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import pinia from "./store";

const app = createApp(App);
const queryClient = new QueryClient();

app.use(pinia);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.mount("#app");
