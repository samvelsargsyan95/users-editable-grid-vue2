export default function guest({ next, store }) {
  if (store.getters["authModule/loginToken"]) {
    return next({
      name: "users",
    });
  }

  return next();
}
