import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/global.less";

import {
  Carousel,
  CarouselItem,
  Timeline,
  TimelineItem,
  Image,
  Row,
  Card,
  Col,
  Table,
  TableColumn,
  Pagination,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(antd);

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Image);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);

// Vue.use(Antd);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
