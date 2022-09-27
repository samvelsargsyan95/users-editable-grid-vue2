import RequestService from "@/services/request.service";

export const usersModule = {
  namespaced: true,
  state: {
    users: [],
    page: null,
    per_page: null,
    total: null,
    total_pages: null,
  },

  mutations: {
    setData(state, data) {
      for (const key in data) {
        state[key] = data[key];
      }
    },
  },

  actions: {
    async getUsers({ commit, state }) {
      const options = {};
      let query = "";

      state.page ? (options.page = state.page) : "";
      state.per_page ? (options.per_page = state.per_page) : "";
      state.total ? (options.total = state.total) : "";
      state.total_pages ? (options.total_pages = state.total_pages) : "";

      if (Object.keys(options).length) {
        query = Object.keys(options)
          .map((key) => key + "=" + options[key])
          .join("&");
      }

      await RequestService.read(`/users?${query}`)
        .then((r) => {
          commit("setData", {
            page: r.data.page,
            per_page: r.data.per_page,
            total: r.data.total,
            total_pages: r.data.total_pages,
            users: r.data.data,
          });
        })
        .catch((e) => console.log(e));
    },

    async deleteUser({ commit, state }, { index, userId }) {
      await RequestService.delete(`/users/${userId}`)
        // .then(async () => {
        //   await dispatch('getUsers')
        // })
        .catch((e) => console.log(e));

      const users = JSON.parse(JSON.stringify(state.users));
      users.splice(index, 1);

      commit("setData", { users });
    },

    async addUser({ dispatch }, data) {
      await RequestService.create("/users", { ...data })
        .then(async () => {
          await dispatch("getUsers");
          return Promise.resolve(true);
        })
        .catch((e) => console.log(e));
    },

    async updateUser({ dispatch }, { userId, data }) {
      await RequestService.update(`/users/${userId}`, { ...data })
        .then(async () => {
          await dispatch("getUsers");
          return Promise.resolve(true);
        })
        .catch((e) => console.log(e));
    },
  },

  getters: {
    data: (state) => state,
  },
};
