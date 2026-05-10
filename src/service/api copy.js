// api.js
import axios from 'axios'

// Constants
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token'
}

// Flag to prevent multiple refresh token requests
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL
  timeout: 15000, // Increased to 15 seconds (was 3 seconds - too low)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    // Skip adding token for auth endpoints that don't need it
    const skipAuthPaths = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/forgot-password']
    const shouldSkipAuth = skipAuthPaths.some(path => config.url?.includes(path))
    
    if (!shouldSkipAuth) {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally with token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // Prevent infinite loops
    if (originalRequest._retry) {
      // Clear tokens and redirect
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
      window.location.href = '/'
      return Promise.reject(error)
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip token refresh for auth endpoints
      const isAuthEndpoint = originalRequest.url?.includes('/auth/')
      
      if (isAuthEndpoint) {
        // For auth endpoints, just clear tokens and redirect
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
        window.location.href = '/login'
        return Promise.reject(error)
      }
      
      // Try to refresh token
      if (!isRefreshing) {
        isRefreshing = true
        originalRequest._retry = true
        
        try {
          const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
          
          if (!refreshToken) {
            throw new Error('No refresh token available')
          }
          
          // Call refresh endpoint
          const response = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            { refreshToken: refreshToken },
            {
              headers: {
                'Content-Type': 'application/json'
              },
              timeout: 10000
            }
          )
          
          if (response.data?.data?.accessToken) {
            const newAccessToken = response.data.data.accessToken
            
            // Store new access token
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken)
            
            // Update Authorization header
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            
            // Process queued requests
            processQueue(null, newAccessToken)
            
            // Retry original request
            return api(originalRequest)
          } else {
            throw new Error('Invalid refresh response')
          }
          
        } catch (refreshError) {
          // Refresh failed - clear tokens and redirect
          console.error('Token refresh failed:', refreshError.message)
          processQueue(refreshError, null)
          
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
          
          // Redirect to login
          window.location.href = '/login'
          return Promise.reject(refreshError)
          
        } finally {
          isRefreshing = false
        }
      } else {
        // Queue requests while token is being refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }
    }
    
    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      error.userMessage = 'Request timeout. Please check your connection and try again.'
    } else if (!error.response) {
      error.userMessage = 'Network error. Please check your internet connection.'
    } else if (error.response?.status === 500) {
      error.userMessage = 'Server error. Please try again later.'
    }
    
    return Promise.reject(error)
  }
)

export default api