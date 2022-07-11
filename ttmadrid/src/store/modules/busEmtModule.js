require("emt-bus");

import a from "emt-bus";

const state = {
  tab: 0,
  busLineAutocomplete: {
    busId: null,
    busName: null,
  },
  busStopAutocomplete: {
    busId: null,
    busName: null,
  },
  items: ["Parada", "Línea de bus"],
  favoriteList: [],
};

const mutations = {
  INSERT_DATA_CRMVC360CLIENTEDET(state, payload) {
    state.crmvc360clientedet = payload;
  },
  INSERT_DATA_CRMVC360COMUNICACIONLST(state, payload) {
    state.crmvc360comunicacionlst = payload;
  },
};

const actions = {
  test(state) {
    // state.a
    //   .getListLines({ Lines: "44", SelectDate: "11/11/2021" })
    //   .then((response) => {
    //     {
    //       console.log("response :>> ", response);
    //     }
    //   });
  },

  actionInsertDataCrmvc360clientedet(context, data) {
    context.commit("INSERT_DATA_CRMVC360CLIENTEDET", data);
  },
  actionInsertDataCrmvc360comunicacionlst(context, data) {
    context.commit("INSERT_DATA_CRMVC360COMUNICACIONLST", data);
  },
};
const getters = {
  getTab(state) {
    return state.tab;
  },
  getBusLineAutocomplete(state) {
    return state.busLineAutocomplete;
  },
  getBusStopAutocomplete(state) {
    return state.busStopAutocomplete;
  },
  getItems(state) {
    return state.items;
  },
  getFavoriteList(state) {
    return state.favoriteList;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
