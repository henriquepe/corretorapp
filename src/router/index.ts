import Vue  from "vue";
import VueRouter from "vue-router";
import store from '../store';

import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Proposes from '../views/Proposes.vue';
import Simulate from '../views/Simulate.vue';
import Simulation from '../views/Simulation.vue';
import Quotate from '../views/Quotate.vue';
import Quotations from '../views/Quotations.vue';
import Quotation from '../views/Quotation.vue';
import Propose from '../views/Propose.vue';
import Policies from '../views/Policies.vue';
import Policy from '../views/Policy.vue';

Vue.use(VueRouter);

const routes: any = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/corretor",
    name: "Dashboard",
  
    component: Dashboard


  },
  {
    path: "/proposes",
    name: "Proposes",
    component: Proposes
  },
  {
    path: "/simulate",
    name: "Simulate",
    component: Simulate
  },
  {
    path: "/simulation",
    name: "Simulation",
  
    component: Simulation
  },
  {
    path: "/quotations/:id",
    name: "Quotate",
  
    component: Quotate
  },
  {
    path: "/quotations",
    name: "Quotations",
  
    component: Quotations
  },
  {
    path: "/quotation",
    name: "Quotation",
  
    component: Quotation
  },
  {
    path: "/proposes/:id",
    name: "Propose",

    component: Propose
  },
  {
    path: "/policies",
    name: "Policies",
  
    component: Policies
  },
  {
    path: "/policies/:id",
    name: "Policy",
    component: Policy
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
