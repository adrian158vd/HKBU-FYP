import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: () => import('../views/AboutUs.vue')
    },
    {
      path: '/movies',
      name: 'MoviesPage',
      component: () => import('../views/MoviesPage.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/book/:id',
      name: 'BookingPage',
      component: () => import('../views/BookingPage.vue')
    },
    {
      path: '/bookings',
      name: 'BookingsPage',
      component: () => import('../views/BookingsPage.vue')
    },




    

  ]
})

export default router
