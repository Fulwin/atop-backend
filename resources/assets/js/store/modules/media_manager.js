const state = {
  showMediaManager: false,
  activeFolderName: '',
  foldersTree: []
};

const getters = {
  showMediaManager: state => {
    return state.showMediaManager;
  },
  foldersTree: state => {
    return state.foldersTree;
  },
  getActiveFolderName: state => {
    return state.activeFolderName;
  }
};

const mutations = {
  toggleMediaManager: (state) => {
    state.showMediaManager = !state.showMediaManager;
  },
  updateFoldersTree: (state, payload) => {
    state.foldersTree = payload.data;
  },
  updateActiveFolderName: (state, payload) => {
    state.activeFolderName = payload.name;
  }
};

const actions = {
  toggleMediaManager: ({ commit }) => {
    commit('toggleMediaManager');
  },
  updateFoldersTree: ({ commit }, payload) => {
    commit('updateFoldersTree', payload);
  },
  updateActiveFolderName: ({commit}, payload) => {
    commit('updateActiveFolderName', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
