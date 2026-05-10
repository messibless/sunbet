// stores/AuthStore.js
import { defineStore } from 'pinia'
import api from '../service/api'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // ============ STATE ============
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const isAuthenticated = ref(false)
  const accessToken = ref(null)
  const refreshTokenValue = ref(null)

  // ============ GETTERS ============
  const getUser = computed(() => user.value)
  const getLoading = computed(() => loading.value)
  const getError = computed(() => error.value)
  const getIsAuthenticated = computed(() => isAuthenticated.value)
  const getUserBalance = computed(() => user.value?.balance || 0)
  const getUserPhone = computed(() => user.value?.phone_number || '')

  // ============ PRIVATE METHODS ============
  const setTokens = (token, refresh = null) => {
    accessToken.value = token
    if (refresh) refreshTokenValue.value = refresh
  }

  const clearTokens = () => {
    accessToken.value = null
    refreshTokenValue.value = null
  }

  const setUserData = (userData) => {
    user.value = {
      id: userData.id,
      phone_number: userData.phone_number,
      balance: userData.balance || 0,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    }
  }

  const clearUserData = () => {
    user.value = null
    isAuthenticated.value = false
    clearTokens()
  }

  // ============ PUBLIC ACTIONS ============
  
  async function register(phoneNumber, password) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/register', {
        phone_number: phoneNumber,
        password: password
      })
      
      if (response.data?.data) {
        const { accessToken: token, refreshToken: refresh, ...userData } = response.data.data
        
        setTokens(token, refresh)
        setUserData(userData)
        isAuthenticated.value = true
        
        return { success: true, data: { user: user.value, accessToken: token } }
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

  async function login(phoneNumber, password) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/login', {
        phone_number: phoneNumber,
        password: password
      })
      
      if (response.data?.data) {
        const { accessToken: token, refreshToken: refresh, ...userData } = response.data.data
        
        setTokens(token, refresh)
        setUserData(userData)
        isAuthenticated.value = true
        
        return { success: true, data: { user: user.value, accessToken: token } }
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

  async function logout() {
    loading.value = true
    
    try {
      const token = accessToken.value
      if (token) {
        try {
          await api.post('/auth/logout')
        } catch (err) {
          console.debug('Logout endpoint error (non-critical):', err.message)
        }
      }
    } catch (err) {
      console.debug('Logout error (non-critical):', err.message)
    } finally {
      clearUserData()
      loading.value = false
    }
  }

  async function checkAuth() {
    if (!accessToken.value || !user.value) {
      clearUserData()
      return false
    }
    
    try {
      const response = await api.get('/auth/profile')
      
      if (response.data?.data) {
        setUserData(response.data.data)
        isAuthenticated.value = true
        return true
      }
      
      throw new Error('Invalid token')
      
    } catch (err) {
      if (err.response?.status === 401) {
        const refreshed = await refreshAccessToken()
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

  async function refreshAccessToken() {
    if (!refreshTokenValue.value) {
      return false
    }
    
    try {
      const response = await api.post('/auth/refresh', {
        refreshToken: refreshTokenValue.value
      })
      
      if (response.data?.data?.accessToken) {
        setTokens(response.data.data.accessToken, refreshTokenValue.value)
        return true
      }
      
      return false
      
    } catch (err) {
      console.error('Token refresh failed:', err.message)
      return false
    }
  }

  async function fetchBalance() {
    if (!isAuthenticated.value || !accessToken.value) {
      return { success: false, error: 'Not authenticated' }
    }
    
    loading.value = true
    
    try {
      const response = await api.get('/auth/balance')
      
      if (response.data?.data && user.value) {
        user.value.balance = response.data.data.balance
        return { success: true, balance: response.data.data.balance }
      }
      
      throw new Error('Failed to fetch balance')
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Balance fetch failed'
      error.value = errorMessage
      
      if (err.response?.status === 401) {
        await logout()
      }
      
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

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

  async function validatePhoneForReset(phoneNumber) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/forgot-password/validate', {
        phone_number: phoneNumber
      })
      
      if (response.data?.success) {
        return { success: true, message: response.data.message || 'Phone number verified' }
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

  async function resetPassword(phoneNumber, newPassword, confirmPassword) {
    loading.value = true
    error.value = null
    
    if (newPassword !== confirmPassword) {
      error.value = 'Passwords do not match'
      return { success: false, error: error.value }
    }
    
    if (newPassword.length < 4) {
      error.value = 'Password must be at least 4 characters'
      return { success: false, error: error.value }
    }
    
    try {
      const response = await api.post('/auth/forgot-password/reset', {
        phone_number: phoneNumber,
        new_password: newPassword,
        confirm_password: confirmPassword
      })
      
      if (response.data?.success) {
        return { success: true, message: response.data.message || 'Password reset successful' }
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

  async function simpleForgotPassword(phoneNumber, newPassword, confirmPassword) {
    loading.value = true
    error.value = null
    
    if (newPassword !== confirmPassword) {
      error.value = 'Passwords do not match'
      return { success: false, error: error.value }
    }
    
    if (newPassword.length < 4) {
      error.value = 'Password must be at least 4 characters'
      return { success: false, error: error.value }
    }
    
    try {
      const response = await api.post('/auth/forgot-password', {
        phone_number: phoneNumber,
        new_password: newPassword,
        confirm_password: confirmPassword
      })
      
      if (response.data?.success) {
        return { success: true, message: response.data.message || 'Password reset successful.' }
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

  function resetError() {
    error.value = null
  }

  // ============ INITIALIZE AUTH - WEKA HAPA ============
  function initializeAuth() {
    // Pinia persist automatically restores state from localStorage
    // We just need to verify the restored state is valid
    console.log('🔐 Initializing auth from Pinia persist:', {
      hasUser: !!user.value,
      hasToken: !!accessToken.value,
      isAuthenticated: isAuthenticated.value
    })
    
    // If state is inconsistent, clear it
    if (isAuthenticated.value && (!accessToken.value || !user.value)) {
      console.log('🧹 Inconsistent state detected - clearing')
      clearUserData()
    }
  }

  // ============ EXPORT ============
  return {
    // State
    user,
    loading,
    error,
    isAuthenticated,
    accessToken,
    refreshToken: refreshTokenValue,
    
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
    refreshToken: refreshAccessToken,
    fetchBalance,
    updateProfile,
    changePassword,
    validatePhoneForReset,
    resetPassword,
    simpleForgotPassword,
    resetError,
    initializeAuth,  
  }
}, {
  
  persist: {
    storage: localStorage,
    paths: ['user', 'isAuthenticated', 'accessToken', 'refreshToken'],
    key: 'sunbet-auth'
  }
})