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
            { path: '', name: 'Home', component: HomeScreen },
            { path: 'sport', name: 'Sport', component: SportScreen },
            { path: 'casino', name: 'Casino', component: CasinoScreen },
            { path: 'live', name: 'Live', component: LiveScreen },
            { path: 'login', name: 'Login', component: Login, meta: { requiresGuest: true } },
            { path: 'register', name: 'Register', component: Register, meta: { requiresGuest: true } },
            { path: 'account', name: 'Profile', component: ProfileScreen, meta: { requiresAuth: true } },
            { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: { requiresGuest: true } }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guard - Use Pinia ONLY, NO localStorage
router.beforeEach((to, from) => {
    const authStore = useAuthStore()
    
    // Get authentication state from Pinia ONLY
    const isLoggedIn = authStore.isAuthenticated && !!authStore.accessToken
    
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    
    console.log('🔐 Navigation:', { to: to.path, isLoggedIn, requiresAuth, requiresGuest })
    
    if (requiresAuth && !isLoggedIn) {
        return { name: 'Login', query: { redirect: to.fullPath } }
    }
    
    if (requiresGuest && isLoggedIn) {
        return { name: 'Home' }
    }
    
    return true
})

export default router