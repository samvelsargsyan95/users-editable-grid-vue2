import RequestService from "@/services/request.service";

export const userModule = {
  namespaced: true,
  state: {
    userData: {},
  },
  mutations: {
    setData(state, data) {
      for (const key in data) {
        state[key] = data[key];
      }
    },
  },

  actions: {
    async getUser({ commit }, userId) {
      await RequestService.read(`/users/${userId}`)
        .then((r) => {
          commit("setData", {
            userData: r.data.data,
          });
        })
        .catch((e) => console.log(e));
    },
  },

  getters: {
    userData: ({ userData }) => userData,
  },
};
