import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { authModule } from "./auth.module";
import { usersModule } from "./users.module";
import { userModule } from "./user.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule,
    usersModule,
    userModule,
  },
  plugins: [createPersistedState()],
});
