import Axios from "axios";
import router from "../../../router";
// local state
const state = {
  users: [],
  isLoading: false,
  errorMsg: "",
};

const getters = {
  // state is module's local state
  getUsers(state) {
    return state.users;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getErrorMsg(state) {
    return state.errorMsg;
  },
};

const mutations = {
  setLoading(state, status) {
    state.isLoading = status;
  },
  setErrorMsg(state, msg) {
    state.errorMsg = msg;
  },
};

const actions = {
  async loginUser({ commit }, data) {
    commit("setLoading", true);
    commit("setErrorMsg", "");
    await Axios.get("https://testapi.io/api/dartya/resource/users/1")
      .then((res) => {
        commit("setLoading", false);
        if (res && res.data) {
          if (
            data.userEmail === res.data.email &&
            data.userPassword === res.data.password
          ) {
            router.push({ name: "home" });
          } else {
            commit("setErrorMsg", "Invalid Credentials!");
          }
        } else {
          commit("setErrorMsg", "Oops,Something went wrong!");
        }
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Oops,Something went wrong!");
      });
  },
  async registerUser({ commit }, payload) {
    commit("setLoading", true);
    commit("setErrorMsg", "");
    let userDetails = {
      name: payload.name,
      email: payload.email,
      role: payload.selectedRole,
      password: payload.password,
      age: payload.age,
      dob: payload.dob,
      gender: payload.selectedGender,
    };
    await Axios.post(
      "https://testapi.io/api/dartya/resource/users",
      userDetails
    )
      .then(() => {
        commit("setLoading", false);
        router.push({ name: "login" });
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Oops! Something went wrong!");
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
