<template>
    <div class="min-h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-blue-600 px-4 relative overflow-hidden">
      <!-- Animated Background Particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        <!-- Floating Orbs -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float-delayed"></div>
      </div>
  
      <!-- Main Card -->
      <div class="relative z-10 w-full max-w-md animate-slideUp">
        <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
          
          <!-- Premium Header -->
          <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 px-8 pt-10 pb-12">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="relative z-10 text-center">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4 animate-bounce-in">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-sm font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
              <p class="text-xs text-purple-100">Sign in to your premium account</p>
            </div>
            <!-- Decorative Wave -->
            <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 48L48 40C96 32 192 16 288 13.3C384 11 480 21 576 26.7C672 32 768 32 864 26.7C960 21 1056 11 1152 13.3C1248 16 1344 32 1392 40L1440 48V48H0Z" fill="white/95"/>
            </svg>
          </div>
  
          <!-- Form Content -->
          <div class="px-8 py-8">
            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Phone Input -->
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <input 
                    v-model="phoneNumber" 
                    type="tel" 
                    placeholder="0712345678"
                    class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-200 group-focus-within:shadow-md"
                    :class="{ 'border-red-500': errors.phone }"
                    @input="errors.phone = ''"
                  />
                </div>
                <div v-if="errors.phone" class="flex items-center mt-1 animate-shake">
                  <svg class="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-red-500 text-xs">{{ errors.phone }}</p>
                </div>
              </div>
              
              <!-- Password Input -->
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Password</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input 
                    v-model="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="Enter your password"
                    class="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-200 group-focus-within:shadow-md"
                    :class="{ 'border-red-500': errors.password }"
                    @input="errors.password = ''"
                  />
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform"
                  >
                    <svg v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg v-else class="h-5 w-5 text-gray-400 hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  </button>
                </div>
                <div v-if="errors.password" class="flex items-center mt-1 animate-shake">
                  <svg class="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-red-500 text-xs">{{ errors.password }}</p>
                </div>
              </div>
  
              <!-- Remember me & Forgot password Premium Style -->
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer group">
                  <div class="relative">
                    <input 
                      v-model="rememberMe" 
                      type="checkbox" 
                      class="sr-only peer"
                    />
                    <div class="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all duration-200"></div>
                    <svg class="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                </label>
                <router-link 
                  to="/forgot-password" 
                  class="text-sm text-purple-600 hover:text-purple-700 font-semibold transition-all hover:scale-105 inline-block"
                >
                  Forgot password?
                </router-link>
              </div>
  
              <!-- Error Message Premium Alert -->
              <transition 
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 transform -translate-y-2"
                enter-to-class="opacity-100 transform translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="errorMessage" class="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-4 rounded-xl animate-shake">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-red-700">{{ errorMessage }}</p>
                    </div>
                  </div>
                </div>
              </transition>
  
              <!-- Premium Login Button -->
              <button 
                type="submit" 
                :disabled="loading"
                class="relative w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div class="flex items-center justify-center relative z-10">
                  <svg v-if="loading" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  {{ loading ? 'Signing in...' : 'Sign In' }}
                </div>
              </button>
  
            
  
            
            </form>
  
            <!-- Sign up link Premium -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
              <p class="text-gray-600">
                Don't have an account? 
                <router-link 
                  to="/register" 
                  class="text-purple-600 font-bold hover:text-purple-700 transition-all hover:scale-105 inline-block ml-1"
                >
                  Create Account →
                </router-link>
              </p>
            </div>
          </div>
        </div>
  
        <!-- Trust Badges -->
        <div class="text-center mt-6">
          <p class="text-white/80 text-xs flex items-center justify-center gap-4">
            <span class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Secure SSL
            </span>
            <span>|</span>
            <span>24/7 Support</span>
            <span>|</span>
            <span>Instant Withdrawals</span>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
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
        console.log('Login successful!')
        
        // If remember me is checked, persist session longer
        if (rememberMe.value) {
          // You can implement longer session expiry here
          localStorage.setItem('remember_me', 'true')
        }
        
        // Redirect to intended page or home
        const redirectPath = route.query.redirect || '/dashboard'
        router.push(redirectPath)
      } else {
        errorMessage.value = result.error || 'Invalid phone number or password'
      }
    } catch (error) {
      console.error('Login error:', error)
      errorMessage.value = 'An unexpected error occurred. Please try again.'
    } finally {
      loading.value = false
    }
  }
  
  // Fill demo credentials
  const fillDemoCredentials = () => {
    phoneNumber.value = '0712345678'
    password.value = 'password123'
    errorMessage.value = ''
    
    // Optional: Auto-submit after filling
    // setTimeout(() => handleLogin(), 100)
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
    if (route.query.reset === 'success') {
      errorMessage.value = 'Password reset successful! Please login with your new password.'
    }
    focusPhoneInput()
  })
  </script>
  
  <style scoped>
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
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
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s ease-out;
  }
  
  .animate-shake {
    animation: shake 0.3s ease-in-out;
  }
  
  .animate-bounce-in {
    animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 8s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  .delay-1000 {
    animation-delay: 1s;
  }
  
  .delay-2000 {
    animation-delay: 2s;
  }
  
  .hover\:shadow-3xl:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  /* Custom checkbox styling */
  input[type="checkbox"].sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Smooth focus effects */
  input:focus {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  /* Premium card hover effect */
  .bg-white\/95 {
    backdrop-filter: blur(10px);
  }
  </style>