const state = {
  visible: false,
};

const mutations = {
  show(state) {
    console.log('show');
    state.visible = true;
  },
  hide(state) {
    state.visible = false;
  },
};

const actions = {
  show({ commit }) {
    commit('show');
  },
  hide({ commit }) {
    commit('hide');
  },
};

export default {
  state,
  mutations,
  actions,
};
