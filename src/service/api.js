// service/api.js
import axios from 'axios'
import { useAuthStore } from '../store/AuthStore'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})

// Request interceptor - Get token from Pinia ONLY
api.interceptors.request.use(
  (config) => {
    const publicPaths = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/forgot-password']
    const isPublicPath = publicPaths.some(path => config.url?.includes(path))
    
    if (!isPublicPath) {
      // Get token from Pinia store - NO localStorage direct access
      const authStore = useAuthStore()
      const token = authStore.accessToken  // ← Only from Pinia
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        console.warn('⚠️ No token in Pinia store for:', config.url)
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const authStore = useAuthStore()
        const refreshed = await authStore.refreshToken()
        
        if (refreshed) {
          const newToken = authStore.accessToken
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        const authStore = useAuthStore()
        await authStore.logout()
      }
    }
    
    return Promise.reject(error)
  }
)

export default api