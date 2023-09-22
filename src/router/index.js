import { createRouter, createWebHistory } from "vue-router";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Panel from "../views/Panel.vue";
import Rutas from "../views/Rutas";
import RutaDetalle from "../views/RutaDetalle";
import Cierre from "../views/Cierre.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/panel",
    name: "Panel",
    component: Panel,
  },
  {
    path: "/rutas",
    name: "Rutas",
    component: Rutas,
  },
  {
    path: "/ruta/:id/detalle",
    name: "RutaDetalle",
    component: RutaDetalle,
  },
  {
    path: "/ruta/cierre/:id",
    name: "Cierre",
    component: Cierre,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
