// stores/AuthStore.js
import { defineStore } from 'pinia'
import api from '../service/api'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Constants
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data'
}

export const useAuthStore = defineStore('auth', () => {
  // ============ STATE ============
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const isAuthenticated = ref(false)
  const tokenExpiry = ref(null)

  // ============ GETTERS ============
  const getUser = computed(() => user.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getIsAuthenticated = computed(() => isAuthenticated.value)
  const getUserBalance = computed(() => user.value?.balance || 0)
  const getUserPhone = computed(() => user.value?.phone_number || '')

  // ============ PRIVATE METHODS ============
  const setTokens = (accessToken, refreshToken = null) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
    }
    
    // Set token expiry (default 1 hour from now)
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 1)
    tokenExpiry.value = expiry
  }

  const clearTokens = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    tokenExpiry.value = null
  }

  const setUserData = (userData) => {
    user.value = {
      id: userData.id,
      phone_number: userData.phone_number,
      balance: userData.balance || 0,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    }
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user.value))
  }

  const clearUserData = () => {
    user.value = null
    isAuthenticated.value = false
    clearTokens()
  }

  // ============ PUBLIC ACTIONS ============
  
  /**
   * Register new user
   * @param {string} phoneNumber - User's phone number
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async function register(phoneNumber, password) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/register', {
        phone_number: phoneNumber,
        password: password
      })
      
      if (response.data?.data) {
        const { accessToken, refreshToken, ...userData } = response.data.data
        
        setTokens(accessToken, refreshToken)
        setUserData(userData)
        isAuthenticated.value = true
        
        return { 
          success: true, 
          data: {
            user: user.value,
            accessToken
          }
        }
      }
      
      throw new Error('Registration failed - No data received')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed'
      error.value = errorMessage
      isAuthenticated.value = false
      
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Login user
   * @param {string} phoneNumber - User's phone number
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async function login(phoneNumber, password) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/login', {
        phone_number: phoneNumber,
        password: password
      })
      
      if (response.data?.data) {
        const { accessToken, refreshToken, ...userData } = response.data.data
        
        setTokens(accessToken, refreshToken)
        setUserData(userData)
        isAuthenticated.value = true
        
        return { 
          success: true, 
          data: {
            user: user.value,
            accessToken
          }
        }
      }
      
      throw new Error('Login failed - No data received')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Invalid credentials'
      error.value = errorMessage
      isAuthenticated.value = false
      
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout user - clear all tokens and user data
   */
  async function logout() {
    loading.value = true
    
    try {
      // Optional: Call logout endpoint to invalidate token on backend
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      if (token) {
        try {
          await api.post('/auth/logout')
        } catch (err) {
          // Silently fail - we don't care if backend logout fails
          console.debug('Logout endpoint error (non-critical):', err.message)
        }
      }
    } catch (err) {
      // Ignore errors during logout
      console.debug('Logout error (non-critical):', err.message)
    } finally {
      clearUserData()
      loading.value = false
      
      // Optional: Redirect to login if using Vue Router
      // const router = useRouter()
      // router.push('/login')
    }
  }

  /**
   * Check if current token is still valid
   * @returns {Promise<boolean>}
   */
  async function checkAuth() {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    
    if (!token || !savedUser) {
      clearUserData()
      return false
    }
    
    // Check token expiry
    if (tokenExpiry.value && new Date() > tokenExpiry.value) {
      const refreshed = await refreshToken()
      if (!refreshed) {
        clearUserData()
        return false
      }
    }
    
    try {
      // Verify with backend and get fresh user data
      const response = await api.get('/auth/profile')
      
      if (response.data?.data) {
        setUserData(response.data.data)
        isAuthenticated.value = true
        return true
      }
      
      throw new Error('Invalid token')
      
    } catch (err) {
      // Token is invalid or expired
      if (err.response?.status === 401) {
        const refreshed = await refreshToken()
        if (!refreshed) {
          clearUserData()
          return false
        }
        return true
      }
      
      clearUserData()
      return false
    }
  }

  /**
   * Refresh access token using refresh token
   * @returns {Promise<boolean>}
   */
  async function refreshToken() {
    const refreshTokenValue = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    
    if (!refreshTokenValue) {
      return false
    }
    
    try {
      const response = await api.post('/auth/refresh', {
        refreshToken: refreshTokenValue
      })
      
      if (response.data?.data?.accessToken) {
        setTokens(response.data.data.accessToken, refreshTokenValue)
        return true
      }
      
      return false
      
    } catch (err) {
      console.error('Token refresh failed:', err.message)
      return false
    }
  }

  /**
   * Get current user balance
   * @returns {Promise<{success: boolean, balance?: number, error?: string}>}
   */
  async function fetchBalance() {
    if (!isAuthenticated.value) {
      return { success: false, error: 'Not authenticated' }
    }
    
    loading.value = true
    
    try {
      const response = await api.get('/auth/balance')
      
      if (response.data?.data) {
        // Update local user data
        if (user.value) {
          user.value.balance = response.data.data.balance
          localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user.value))
        }
        
        return { 
          success: true, 
          balance: response.data.data.balance 
        }
      }
      
      throw new Error('Failed to fetch balance')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Balance fetch failed'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Update user profile
   * @param {object} updateData - Data to update
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  async function updateProfile(updateData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.put('/auth/profile', updateData)
      
      if (response.data?.data) {
        setUserData(response.data.data)
        return { success: true, data: user.value }
      }
      
      throw new Error('Profile update failed')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Profile update failed'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async function changePassword(currentPassword, newPassword) {
    loading.value = true
    error.value = null
    
    try {
      await api.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      })
      
      return { success: true }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Password change failed'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Forgot password - validate phone number (Step 1)
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  async function validatePhoneForReset(phoneNumber) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/forgot-password/validate', {
        phone_number: phoneNumber
      })
      
      if (response.data?.success) {
        return { 
          success: true, 
          message: response.data.message || 'Phone number verified' 
        }
      }
      
      throw new Error(response.data?.message || 'Phone number not found')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Phone number validation failed'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Forgot password - reset password (Step 2)
   * @param {string} phoneNumber - User's phone number
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Confirm new password
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  async function resetPassword(phoneNumber, newPassword, confirmPassword) {
    loading.value = true
    error.value = null
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      error.value = 'Passwords do not match'
      return { success: false, error: error.value }
    }
    
    // Validate password length
    if (newPassword.length < 6) {
      error.value = 'Password must be at least 6 characters'
      return { success: false, error: error.value }
    }
    
    try {
      const response = await api.post('/auth/forgot-password/reset', {
        phone_number: phoneNumber,
        new_password: newPassword,
        confirm_password: confirmPassword
      })
      
      if (response.data?.success) {
        return { 
          success: true, 
          message: response.data.message || 'Password reset successful' 
        }
      }
      
      throw new Error(response.data?.message || 'Password reset failed')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Password reset failed'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Simple forgot password - one step (Simplest flow)
   * @param {string} phoneNumber - User's phone number
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Confirm new password
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  async function simpleForgotPassword(phoneNumber, newPassword, confirmPassword) {
    loading.value = true
    error.value = null
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      error.value = 'Passwords do not match'
      return { success: false, error: error.value }
    }
    
    // Validate password length
    if (newPassword.length < 6) {
      error.value = 'Password must be at least 6 characters'
      return { success: false, error: error.value }
    }
    
    try {
      const response = await api.post('/auth/forgot-password', {
        phone_number: phoneNumber,
        new_password: newPassword,
        confirm_password: confirmPassword
      })
      
      if (response.data?.success) {
        return { 
          success: true, 
          message: response.data.message || 'Password reset successful. Please login with your new password.' 
        }
      }
      
      throw new Error(response.data?.message || 'Password reset failed')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Password reset failed'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset error state
   */
  function resetError() {
    error.value = null
  }

  /**
   * Initialize auth state from localStorage (call this on app mount)
   */
  function initializeAuth() {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    
    if (savedUser && token) {
      try {
        user.value = JSON.parse(savedUser)
        isAuthenticated.value = true
      } catch (e) {
        clearUserData()
      }
    }
  }

  // ============ EXPORT ============
  return {
    // State
    user,
    loading,
    error,
    isAuthenticated,
    
    // Getters
    getUser,
    getLoading,
    getError,
    getIsAuthenticated,
    getUserBalance,
    getUserPhone,
    
    // Actions
    register,
    login,
    logout,
    checkAuth,
    refreshToken,
    fetchBalance,
    updateProfile,
    changePassword,
    validatePhoneForReset,
    resetPassword,
    simpleForgotPassword,
    resetError,
    initializeAuth
  }
}, {
  // Persistence configuration - only persist non-sensitive data
  persist: {
    storage: localStorage,
    paths: ['isAuthenticated'], // Only persist authentication status
    key: 'sunbet-auth'
  }
})