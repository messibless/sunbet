<template>
    <div class="min-h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
        
        <!-- Use @click instead of @submit for debugging -->
        <div class="space-y-5">
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
            <label class="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Minimum 6 characters"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <button 
            @click="handleRegister"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
          >
            {{ loading ? 'Processing...' : 'Register' }}
          </button>
          
          <p class="text-center text-gray-600">
            Already registered? 
            <router-link to="/login" class="text-purple-600 font-semibold">Sign in</router-link>
          </p>
        </div>
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
  const password = ref('')
  const loading = ref(false)
  
  const handleRegister = async () => {
    console.log('Button clicked!')
    
    if (!phoneNumber.value) {
      alert('Please enter phone number')
      return
    }
    
    if (!password.value) {
      alert('Please enter password')
      return
    }
    
    loading.value = true
    
    try {
      const cleanPhone = phoneNumber.value.replace(/\D/g, '')
      const result = await authStore.register(cleanPhone, password.value)
      
      if (result.success) {
        alert('Registration successful!')
        router.push('/')
      } else {
        alert(result.error || 'Registration failed')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred')
    } finally {
      loading.value = false
    }
  }
  </script>