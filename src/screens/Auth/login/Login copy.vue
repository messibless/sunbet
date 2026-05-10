<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all duration-300 animate-slideUp">
        <!-- Logo/Brand -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p class="text-gray-500 mt-2">Sign in to your account</p>
        </div>
  
        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-gray-700 font-medium mb-2">Phone Number</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <input 
                v-model="phoneNumber" 
                type="tel" 
                placeholder="0712345678"
                class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200"
                :class="{ 'border-red-500': errors.phone }"
              />
            </div>
            <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="Enter your password"
                class="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200"
                :class="{ 'border-red-500': errors.password }"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
          </div>
  
          <!-- Remember me & Forgot password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input 
                v-model="rememberMe" 
                type="checkbox" 
                class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <router-link to="/forgot-password" class="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Forgot password?
            </router-link>
          </div>
  
          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-3 rounded animate-shake">
            <p class="text-red-600 text-sm">{{ errorMessage }}</p>
          </div>
  
          <!-- Login Button -->
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <div class="flex items-center justify-center">
              <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </div>
          </button>
  
          <!-- Demo Credentials (Development only) -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <p class="text-xs text-center text-gray-500 mb-3">Demo Credentials (Development)</p>
            <div class="flex gap-2 justify-center text-xs">
              <button type="button" @click="fillDemoCredentials" class="px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition">
                Demo User
              </button>
            </div>
          </div>
        </form>
  
        <!-- Sign up link -->
        <p class="text-center text-gray-600 mt-6">
          Don't have an account? 
          <router-link to="/register" class="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            Create Account
          </router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive,onMounted  } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '../../../store/AuthStore'
  
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  
  // Form data
  const phoneNumber = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const showPassword = ref(false)
  const loading = ref(false)
  const errorMessage = ref('')
  
  // Validation errors
  const errors = reactive({
    phone: '',
    password: ''
  })
  
  // Validation functions
  const validateForm = () => {
    let isValid = true
    
    // Reset errors
    errors.phone = ''
    errors.password = ''
    
    // Validate phone
    if (!phoneNumber.value) {
      errors.phone = 'Phone number is required'
      isValid = false
    } else {
      const cleanPhone = phoneNumber.value.replace(/\D/g, '')
      if (cleanPhone.length < 10) {
        errors.phone = 'Please enter a valid phone number (10-12 digits)'
        isValid = false
      }
    }
    
    // Validate password
    if (!password.value) {
      errors.password = 'Password is required'
      isValid = false
    } else if (password.value.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }
    
    return isValid
  }
  
  // Handle login
  const handleLogin = async () => {
    console.log('Login button clicked!')
    
    // Clear previous error
    errorMessage.value = ''
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    loading.value = true
    
    try {
      // Clean phone number
      const cleanPhone = phoneNumber.value.replace(/\D/g, '')
      
      console.log('Attempting login for:', cleanPhone)
      
      // Call login action
      const result = await authStore.login(cleanPhone, password.value)
      
      console.log('Login result:', result)
      
      if (result.success) {
        // Show success message
        console.log('Login successful!')
        
        // Redirect to intended page or home
        const redirectPath = route.query.redirect || '/'
        router.push(redirectPath)
      } else {
        // Show error message
        errorMessage.value = result.error || 'Invalid phone number or password'
      }
    } catch (error) {
      console.error('Login error:', error)
      errorMessage.value = 'An unexpected error occurred. Please try again.'
    } finally {
      loading.value = false
    }
  }
  
  // Fill demo credentials (for development)
  const fillDemoCredentials = () => {
    phoneNumber.value = '0712345678'
    password.value = 'password123'
    errorMessage.value = ''
  }
  
  // Auto-focus on phone input
  const focusPhoneInput = () => {
    const input = document.querySelector('input[type="tel"]')
    if (input) input.focus()
  }
  
  // Check if coming from registration
  onMounted(() => {
    if (route.query.registered === 'true') {
      errorMessage.value = 'Registration successful! Please login.'
    }
    focusPhoneInput()
  })
  </script>
  
  <style scoped>
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }
  
  .animate-shake {
    animation: shake 0.3s ease-in-out;
  }
  </style>