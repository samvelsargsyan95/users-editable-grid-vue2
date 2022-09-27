export default function auth({ next, store }) {
  if (!store.getters["authModule/loginToken"]) {
    return next({
      name: "login",
    });
  }

  return next();
}
