// router/index.js
import { createWebHistory, createRouter } from 'vue-router'

import HomeScreen from '../screens/home/HomeScreen.vue'
import SportScreen from '../screens/sport/SportScreen.vue'
import CasinoScreen from '../screens/casino/CasinoScreen.vue'
import LiveScreen from '../screens/live/LiveScreen.vue'
import DefaultLayout from '../components/layout/DefaultLayout.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,  
        children: [              
            {
                path: '',        
                component: HomeScreen
            },
            
        ]
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
        }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router