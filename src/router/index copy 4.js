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


const routes = [
    {
        path: '/',
        component: DefaultLayout,  
        children: [              
            {
                path: '',        
                component: HomeScreen
            },
            {
                path:'/sport',
                component:SportScreen
            },
            {
                path:'/casino',
                component:CasinoScreen
            },
            {
                path:'/live',
                component:LiveScreen
            },
            {
                path:'/register',
                component:Register
            }
            ,
            {
                path:'/login',
                component:Login
            },
            {
                path:'/account',
                component:ProfileScreen
            }

            
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router