const state = {
  language: 'EN',
  categoriesTree: null,
  editorOption: {
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
    iframePath: '',
    classList: ['min-height-300'],
    fileuploadUrl: '/save_uploade_image'
  },
  h5EditorOption: {

  },
  currentCategoryId: null  // 指当前被点击的 category 的 id 值
};

const getters = {
  currentLanguage: state => {
    return state.language;
  },
  currentCategoriesTree: state => {
    return state.categoriesTree;
  },
  getCurrentCategoryId: state => {
    return state.currentCategoryId;
  },
  getWysiwygEditorOption: state => {
    return state.editorOption;
  },
  getHtml5EditorOption: state => {
    return state.h5EditorOption;
  }
};

const mutations = {
  setLanguage: (state, language) => {
    // 传递的参数也可以不是对象,而是一个普通变量, 但是数量只能是一个
    state.language = language;
  },
  updateCategoriesTree: (state, payload) => {
    state.categoriesTree = payload.data;
  },
  updateCurrentCategoryId: (state, categoryId) => {
    state.currentCategoryId = categoryId;
  }
};

const actions = {
  switchLanguage: ({ commit }, payload) => {
    commit('setLanguage', payload.lang);
  },
  fetchCategoriesTree: context => {
    // 执行一个异步操作, 注意这里使用 http, 不是$http. 取得当前登陆用户的数据
    Vue.http.get('/api/get_categories_tree/' + context.getters.currentLanguage).then(res => {
      return res.json();
    }).then(dataInJson => {
      // 在这里执行 commit mutation 的工作
      context.commit('updateCategoriesTree', {data: dataInJson});
    });
  },
  updateCurrentCategoryId: ({ commit }, payload) => {
    commit('updateCurrentCategoryId', payload.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
