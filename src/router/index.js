import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Login from "@/views/Login";
import Users from "@/views/Users";
import User from "@/views/User";
import PageNotFound from "@/views/PageNotFound";

import guest from "./middleware/guest";
import auth from "./middleware/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "login",
    component: Login,
    children: [
      {
        path: "/login",
        meta: {
          middleware: [guest],
        },
      },
    ],
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/user/:userId",
    component: User,
    meta: {
      middleware: [auth],
    },
  },
  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };

  return middleware[0]({
    ...context,
  });
});

export default router;
