import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home/Home.vue'
import EditFloorplan from "@/pages/home/editFloorplan/EditFloorplan.vue";
import Design from "@/pages/home/design/Design.vue";
import AddItems from "@/pages/home/addItems/AddItems.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: "/home/editFloorplan",
    children: [
      {
        path: 'editFloorplan',
        component: EditFloorplan
      },
      {
        path: 'design',
        component: Design
      },
      {
        path: 'addItems',
        component: AddItems
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
