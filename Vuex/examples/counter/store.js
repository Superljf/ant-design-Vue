import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 初始化数据
const state = {
  count: 0,
};

// 接收参数改变state值 同步处理  相当于reducers
const mutations = {
  increment(state, payload) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  },
};

// 调用mutations方法 异步处理数据 相当于 effects
const actions = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit("increment");
    }
  },
  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("increment");
        resolve();
      }, 1000);
    });
  },
};

// 进一步对state进行处理
const getters = {
  evenOrOdd: (state) => (state.count % 2 === 0 ? "even" : "odd"),
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
