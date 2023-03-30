import Vue from 'vue'
import { Notification, Image } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Image)
Vue.prototype.$notify = Notification;