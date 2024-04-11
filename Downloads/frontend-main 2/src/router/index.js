import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login_Page from "../components/Login_Page.vue";
import Register_User from "../components/Register_User.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import bookissue from "../components/bookissue.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login_Page,
  },
  {
    path: "/register",
    name: "register",
    component: Register_User,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard,
  },
  {
    path: "/bookissue",
    name: "bookissue",
    component: bookissue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
