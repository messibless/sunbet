<!-- App.vue -->
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './store/AuthStore'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth from Pinia persist (restores saved state)
  authStore.initializeAuth()
  
  // Optional: Verify token is still valid
  if (authStore.isAuthenticated) {
    authStore.checkAuth().catch(() => {
      // checkAuth will handle logout if token invalid
    })
  }
})
</script>

<template>
  <div class="h-screen w-screen">
    <RouterView/>
  </div>
</template>