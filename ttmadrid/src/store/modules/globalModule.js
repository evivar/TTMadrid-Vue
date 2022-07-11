import emtApi from "../../utils/emtApi";

const state = {
  email: "",
  password: "",
  logged: false,
  accessToken: "",
};

const mutations = {
  SET_ACCESS_TOKEN(state, payload) {
    state.accessToken = payload;
  },
  SET_LOGGED(state, payload) {
    state.logged = payload;
  },
};

const actions = {
  loginAPI(context, data) {
    emtApi
      .get("v2/mobilitylabs/user/login/", {
        headers: {
          email: "sycoraxsoftware@gmail.com",
          password: "Kamisama123",
        },
      })
      .then((response) => {
        console.log("response loginAPI :>> ", response);
        if (response.data.code === "01" || response.data.code === "00") {
          context.dispatch("setAccessToken", response.data.data[0].accessToken);
        }
      });
  },

  setAccessToken(context, data) {
    context.commit("SET_ACCESS_TOKEN", data);
  },
  setLogged(context, data) {
    context.commit("SET_LOGGED", data);
  },
};
const getters = {
  getAccessToken(state) {
    return state.accessToken;
  },
  getEmail(state) {
    return state.email;
  },
  getPassword(state) {
    return state.password;
  },
  isLoggedIn(state) {
    return state.logged;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
