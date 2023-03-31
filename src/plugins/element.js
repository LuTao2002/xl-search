import Vue from 'vue'
import { Notification, Image, Row, Col, Loading } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Image)
Vue.use(Row)
Vue.use(Col)
Vue.use(Loading.directive);
Vue.prototype.$notify = Notification;