// router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import HomeScreen from '../screens/home/HomeScreen.vue'
import SportScreen from '../screens/sport/SportScreen.vue'
import CasinoScreen from '../screens/casino/CasinoScreen.vue'
import LiveScreen from '../screens/live/LiveScreen.vue'
import DefaultLayout from '../components/layout/DefaultLayout.vue'
import Login from '../screens/Auth/login/Login.vue'
import Register from '../screens/Auth/register/Register.vue'
import ProfileScreen from '../screens/profie/ProfileScreen.vue'
import ForgotPassword from '../screens/Auth/forgot_password/ForgotPassword.vue'

// Helper function to check authentication
const isAuthenticated = () => {
  // Use the same key as AuthStore
  const token = localStorage.getItem('access_token')
  return token !== null && token !== ''
}

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: HomeScreen
            },
            {
                path: 'sport',
                name: 'Sport',
                component: SportScreen
            },
            {
                path: 'casino',
                name: 'Casino',
                component: CasinoScreen
            },
            {
                path: 'live',
                name: 'Live',
                component: LiveScreen
            },
            {
                path: 'login',
                name: 'Login',
                component: Login,
                meta: { requiresGuest: true }
            },
            {
                path: 'register',
                name: 'Register',
                component: Register,
                meta: { requiresGuest: true }
            },
            {
                path: 'account',
                name: 'Profile',
                component: ProfileScreen,
                meta: { requiresAuth: true }
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: ForgotPassword,
                meta: { requiresGuest: true } 
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guard - Authentication Logic
router.beforeEach((to, from, next) => {
    // Check if user is logged in using correct key
    const authenticated = isAuthenticated()
    
    // Check if route requires authentication
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    
    // Check if route is for guests only (login/register/forgot-password)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    
    console.log(' Navigation Guard:', {
        to: to.path,
        authenticated,
        requiresAuth,
        requiresGuest
    })
    
    // Case 1: Route requires auth but user is NOT logged in
    if (requiresAuth && !authenticated) {
        console.log(' Redirecting to login (auth required)')
        next({ 
            name: 'Login',
            query: { redirect: to.fullPath }
        })
    }
    // Case 2: Guest tries to access login/register when already logged in
    else if (requiresGuest && authenticated) {
        console.log(' Redirecting to home (already logged in)')
        next({ name: 'Home' })
    }
    // Case 3: All good, proceed
    else {
        next()
    }
})

export default router