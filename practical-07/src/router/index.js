import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../Pages/HomePage.vue";
import LoginPage from "../Pages/LoginPage.vue";
import RegisterPage from "../Pages/RegisterPage.vue";
import CarDetailsPage from "../Pages/CarDetailsPage.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "home" } },
  { path: "/home", name: "home", component: HomePage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/register", name: "register", component: RegisterPage },
  { path: "/carDetails/:carId", name: "carDetails", component: CarDetailsPage },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
