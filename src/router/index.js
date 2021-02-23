import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  {
    path: "/",
    redirect: "Login",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
    import("../views/login/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
