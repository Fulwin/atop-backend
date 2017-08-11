import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import Auth from '../plugins/Auth';
import users from './modules/user';
import categories from './modules/categories';
import MediaManager from './modules/media_manager';

// Wysiwyg Editor
import Vueditor from 'vueditor';
import 'style-loader!css-loader!vueditor/dist/css/vueditor.min.css';

let config = {
  toolbar: [
    'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', '|',
    'bold', 'italic', 'underline', 'links',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight','|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: "宋体, SimSun", abbr: "宋体"}, {val: "黑体, SimHei", abbr: "黑体"},
    {val: "楷体, SimKai", abbr: "楷体"}, {val: "微软雅黑, 'Microsoft YaHei'", abbr: "微软雅黑"},
    {val: "arial black"}, {val: "times new roman"}, {val: "Courier New"}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  emoji: [],
  lang: 'en',
  mode: 'default',
  iframePath: '/the_upload_action_url',
  classList: ['min-height-300'],
  fileuploadUrl: ''
};
// Wysiwyg Editor config Done

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(Auth);
Vue.use(Vueditor, config);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    categories,
    MediaManager
  }
});
