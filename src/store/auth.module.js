import RequestService from "@/services/request.service";

export const authModule = {
  namespaced: true,
  state: {
    loginToken: null,
  },

  mutations: {
    setData(state, data) {
      for (const key in data) {
        state[key] = data[key];
      }
    },
  },

  actions: {
    async login({ commit }, data) {
      await RequestService.create("/login", { ...data })
        .then((r) => {
          if (r.data.token !== undefined) {
            commit("setData", { loginToken: r.data.token });
          }
        })
    },
  },

  getters: {
    loginToken: ({ loginToken }) => loginToken,
  },
};
