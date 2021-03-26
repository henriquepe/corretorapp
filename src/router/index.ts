import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from '../store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/corretor",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue")


  },
  {
    path: "/proposes",
    name: "Proposes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Proposes.vue")
  },
  {
    path: "/simulate",
    name: "Simulate",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Simulate.vue")
  },
  {
    path: "/simulation",
    name: "Simulation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Simulation.vue")
  },
  {
    path: "/quotations/:id",
    name: "Quotate",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Quotate.vue")
  },
  {
    path: "/quotations",
    name: "Quotations",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Quotations.vue")
  },
  {
    path: "/quotation",
    name: "Quotation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Quotation.vue")
  },
  {
    path: "/proposes/:id",
    name: "Propose",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Propose.vue")
  },
  {
    path: "/policies",
    name: "Policies",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Policies.vue")
  },
  {
    path: "/policies/:id",
    name: "Policy",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Policy.vue")
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {

  store.state.token = localStorage.getItem('@corretor-token') as string;

  if(to.name !== 'Login' && !store.state.token) next({name: 'Login'})
  else next()

})



export default router;
