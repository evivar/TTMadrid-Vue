import Vue from "vue";
import Vuex from "vuex";

import busEmtModule from "./modules/busEmtModule";
import globalModule from "./modules/globalModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerModel: 0,
  },
  mutations: {
    SET_DRAWER_MODEL(state, payload) {
      state.drawerModel = payload;
    },
  },
  actions: {
    actionSetDrawerModel(payload) {
      this.commit("SET_DRAWER_MODEL", payload);
    },
  },
  getters: {
    getDrawerModel(state) {
      return state.drawerModel;
    },
  },
  modules: {
    globalModule,
    busEmtModule,
    // biciMadModule
  },
});
