<!-- ForgotPassword.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Reset Password</h2>
          <p class="text-gray-500 mt-2">Enter your phone number and new password</p>
        </div>
  
        <form @submit.prevent="handleResetPassword" class="space-y-5">
          <div>
            <label class="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input 
              v-model="phoneNumber" 
              type="tel" 
              placeholder="0712345678"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
  
          <div>
            <label class="block text-gray-700 font-medium mb-2">New Password</label>
            <input 
              v-model="newPassword" 
              type="password" 
              placeholder="Minimum 6 characters"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
  
          <div>
            <label class="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input 
              v-model="confirmPassword" 
              type="password" 
              placeholder="Confirm your new password"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
  
          <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p class="text-red-600 text-sm">{{ errorMessage }}</p>
          </div>
  
          <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p class="text-green-600 text-sm">{{ successMessage }}</p>
          </div>
  
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
          >
            {{ loading ? 'Resetting...' : 'Reset Password' }}
          </button>
  
          <p class="text-center text-gray-600">
            Remember your password? 
            <router-link to="/login" class="text-purple-600 font-semibold">Sign In</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../../../store/AuthStore'
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  const phoneNumber = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  const loading = ref(false)
  const errorMessage = ref('')
  const successMessage = ref('')
  
  const handleResetPassword = async () => {
    errorMessage.value = ''
    successMessage.value = ''
    
    if (!phoneNumber.value) {
      errorMessage.value = 'Phone number is required'
      return
    }
    
    if (!newPassword.value) {
      errorMessage.value = 'New password is required'
      return
    }
    
    if (newPassword.value.length < 6) {
      errorMessage.value = 'Password must be at least 6 characters'
      return
    }
    
    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }
    
    loading.value = true
    
    try {
      const cleanPhone = phoneNumber.value.replace(/\D/g, '')
      const result = await authStore.simpleForgotPassword(cleanPhone, newPassword.value, confirmPassword.value)
      
      if (result.success) {
        successMessage.value = result.message || 'Password reset successful! Redirecting to login...'
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        errorMessage.value = result.error || 'Password reset failed'
      }
    } catch (error) {
      errorMessage.value = 'An error occurred. Please try again.'
    } finally {
      loading.value = false
    }
  }
  </script>