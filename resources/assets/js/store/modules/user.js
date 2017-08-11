const state = {
  loggedIn: false,
  user: {
    name: 'Admin',
    id: ''
  }
};

const getters = {
  username: state => {
    return state.user.name;
  },
  userId: state => {
    return state.user.id;
  },
  isLoggedIn: state => {
    return state.loggedIn;
  }
};

const mutations = {
  updateUsername: (state, payload) => {
    state.user.name = payload.name;
  },
  updateUserId: (state, payload) => {
    state.user.id = payload.id;
  },
  setLoggedInStatus: (state, payload) => {
    // payload 对象包含 status 属性, 该值用来设定当前用户是否登陆的指示位
    state.loggedIn = payload.status;
  }
};

const actions = {
  checkLoggedInStatus: ({ commit }) => {
    // 这个 Action 用来设定并返回当前用户是否登陆的状态值
    let status = Vue.auth.loggedIn();
    let payload = { status: status};
    commit('setLoggedInStatus', payload);
    return status;
  },
  fetchUser: ({ commit }) => {
    // 执行一个异步操作, 注意这里使用 http, 不是$http. 取得当前登陆用户的数据
    Vue.http.get('/api/get_user').then(res => {
      return res.json();
    }).then(dataInJson => {
      // 在这里执行 commit mutation 的工作
      commit('updateUsername', {name: dataInJson.name});
      commit('updateUserId', {id: dataInJson.id});
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
