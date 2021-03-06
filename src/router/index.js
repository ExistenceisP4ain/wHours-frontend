import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Auth} from '@/services'
import store from '@/store.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/korisnik',
    name: 'korisnik',
    component: () => import('../views/korisnik.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/calendar.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile.vue')
  },
  {
    path: '/pocetna',
    name: 'pocetna',
    component: () => import('../views/pocetna.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/zakljucano',
    name: 'zakljucano',
    component: () => import('../views/zakljucano.vue')
  },
  {
    path: '/adminzakljucano',
    name: 'adminzakljucano',
    component: () => import('../views/adminzakljucano.vue')
  },
  {
    path: '/adminprofil',
    name: 'adminprofil',
    component: () => import('../views/adminprofil.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  const javneStranice=["/login","/register","/pocetna","/"]
  const loginPotreban=javneStranice.includes(to.path)
  const admin=Auth.state.admin;
  if(loginPotreban && admin==false){
    return next('/korisnik')
  }
  if(loginPotreban && admin==true){
    return next('/admin')
  }
  else next()
})

export default router
