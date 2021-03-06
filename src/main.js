// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import axios from 'axios';
import store from './store/index';
axios.defaults.baseURL = 'http://47.98.235.117:1337/';
import Qs from 'qs';
import VueQuillEditor from 'vue-quill-editor';
import ImageResize from 'quill-image-resize-module';
import App from './App'
import router from './router'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Quill from 'quill';
Quill.register('modules/imageResize', ImageResize);  //添加
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);
Vue.use(VueQuillEditor);
Vue.prototype.$axios= axios;
Vue.prototype.qs= Qs;//记住要this.qs
Vue.use(ElementUI);
Vue.use(Vuex);
import Router from 'vue-router';
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store
});
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });
  Vue.directive('loadmore', {
    bind(el, binding) {
      const selectWrap = el.querySelector('.el-table__body-wrapper')
      selectWrap.addEventListener('scroll', function() {
        let sign = 0
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= sign) {
          binding.value()
        }
      })
    }
  })

