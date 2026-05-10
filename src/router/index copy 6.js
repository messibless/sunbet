// router/index.js
import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '../store/AuthStore'

import HomeScreen from '../screens/home/HomeScreen.vue'
import SportScreen from '../screens/sport/SportScreen.vue'
import CasinoScreen from '../screens/casino/CasinoScreen.vue'
import LiveScreen from '../screens/live/LiveScreen.vue'
import DefaultLayout from '../components/layout/DefaultLayout.vue'
import Login from '../screens/Auth/login/Login.vue'
import Register from '../screens/Auth/register/Register.vue'
import ProfileScreen from '../screens/profie/ProfileScreen.vue'
import ForgotPassword from '../screens/Auth/forgot_password/ForgotPassword.vue'

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

// Navigation Guard - Modern Approach (No next() callback)
router.beforeEach((to, from) => {
    // Get auth store instance
    const authStore = useAuthStore()
    
    // Check authentication from store state
    const authenticated = authStore.isAuthenticated
    
    // Fallback: check localStorage if store isn't initialized
    const hasToken = localStorage.getItem('access_token') !== null
    
    const isLoggedIn = authenticated || hasToken
    
    // Check route requirements
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    
    console.log(' Navigation Guard:', {
        to: to.path,
        authenticated,
        hasToken,
        isLoggedIn,
        requiresAuth,
        requiresGuest
    })
    
    // Case 1: Route requires auth but user is NOT logged in
    if (requiresAuth && !isLoggedIn) {
        console.log(' Redirecting to login (auth required)')
        return { 
            name: 'Login',
            query: { redirect: to.fullPath }
        }
    }
    
    // Case 2: Guest tries to access login/register/forgot-password when already logged in
    if (requiresGuest && isLoggedIn) {
        console.log(' Redirecting to home (already logged in)')
        return { name: 'Home' }
    }
    
    // Case 3: All good, proceed
    return true
})

export default router