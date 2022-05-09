import Axios from "axios";

// local state
const state = {
  carsData: [],
  carData: {},
  selectedCarData: {
    carId: "",
    carName: "",
    carDetails: "",
    carPrice: "",
    carImgURL: "",
  },
  isLoading: false,
  successMsg: "",
  errorMsg: "",
};

const getters = {
  getCarsData(state) {
    return state.carsData;
  },
  getCarData(state) {
    return state.carData;
  },
  getSelectedCarData(state) {
    return state.selectedCarData;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getSuccessMsg(state) {
    return state.successMsg;
  },
  getErrorMsg(state) {
    return state.errorMsg;
  },
};

const mutations = {
  setCarsData(state, data) {
    state.carsData = data;
  },
  setCarData(state, data) {
    state.carData = data;
  },
  setSelectedCarData(state, data) {
    state.selectedCarData = data;
  },
  setLoading(state, status) {
    state.isLoading = status;
  },
  setSuccessMsg(state, msg) {
    state.successMsg = msg;
  },
  setErrorMsg(state, msg) {
    state.errorMsg = msg;
  },
};

const actions = {
  async getCarsData({ commit }) {
    commit("setLoading", true);
    commit("setSuccessMsg", "");
    commit("setErrorMsg", "");
    await Axios.get("https://testapi.io/api/dartya/resource/cardata")
      .then((res) => {
        commit("setLoading", false);
        let formatedData = res.data.data.map((item) => {
          return {
            id: item.id,
            title: item.name,
            image: item.image,
            description: item.details,
            price: item.price,
          };
        });
        commit("setCarsData", formatedData);
      })
      .catch((err) => {
        this.errorMsg = err;
        commit("setLoading", false);
        commit("setErrorMsg", err);
      });
  },
  async getCarData({ commit }, id) {
    commit("setLoading", true);
    await Axios.get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
      .then((res) => {
        commit("setLoading", false);
        if (res && res.data) {
          let carData = {
            id: res.data.id,
            image: res.data.image,
            name: res.data.name,
            details: res.data.details,
            price: res.data.price,
          };
          commit("setCarData", carData);
          commit("setErrorMsg", "");
        } else {
          commit("setErrorMsg", "Oops, something went wrong!");
        }
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Oops, something went wrong!");
      });
  },
  async addNewCar({ commit }, data) {
    commit("setLoading", true);
    commit("setSuccessMsg", "");
    commit("setErrorMsg", "");
    await Axios.post("https://testapi.io/api/dartya/resource/cardata", {
      name: data.carName,
      details: data.carDetails,
      image: data.carImgURL,
      price: data.carPrice,
    })
      .then(() => {
        commit("setLoading", false);
        commit("setSuccessMsg", "Car data added successfully!");
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Car data not added!");
      });
  },
  async updateCarData({ commit }, data) {
    commit("setLoading", true);
    commit("setSuccessMsg", "");
    commit("setErrorMsg", "");
    await Axios.put(
      `https://testapi.io/api/dartya/resource/cardata/${data.carId}`,
      {
        name: data.carName,
        details: data.carDetails,
        image: data.carImgURL,
        price: data.carPrice,
      }
    )
      .then(() => {
        commit("setLoading", false);
        commit("setSuccessMsg", "Car data updated successfully!");
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setSuccessMsg", "Car data not updated!");
      });
  },
  async deleteCar({ commit }, data) {
    commit("setLoading", true);
    commit("setSuccessMsg", "");
    commit("setErrorMsg", "");
    await Axios.delete(
      `https://testapi.io/api/dartya/resource/cardata/${data.id}`
    )
      .then(() => {
        commit("setLoading", false);
        commit("setSuccessMsg", "Successfully Deleted!");
        return "success";
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Car is not deleted!");
        return "error";
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
