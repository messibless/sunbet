<template>
  <header class="bg-gradient-to-r from-cyan-950 via-cyan-950 to-cyan-950 border-b border-gray-700">
    <!-- Top Bar - Logo and Main Navigation -->
    <div class="px-1 py-2">
      <div class="flex flex-col">

        <!-- First Row: Logo and User Actions -->
        <div class="flex items-center justify-between">
          <!-- Logo Section -->
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-2 px-2">
              <!-- Logo Icon -->
              
              <div>
               <div class="flex gap-2 items-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
                <h1 class="text-xl font-bold text-white ">
                  <span class="text-white font-bold ">S </span><span class="text-orange-600 font-bold ">B</span>
                </h1>
               </div>
                <p class="text-xs text-gray-400 hidden md:block">Premium Betting</p>
              </div>
            </div>
          </div>

          <!-- User Info & Actions -->
          <div class="flex items-center space-x-3">
            <!-- Balance Display (if logged in) -->
            <div v-if="authStore.isAuthenticated" class="hidden md:flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-1.5">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-white font-semibold">TZS {{ formatBalance }}</span>
            </div>

            <!-- Deposit Button -->
            <button 
              v-if="authStore.isAuthenticated"
              class="hidden md:flex items-center space-x-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-1.5 rounded-lg transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Deposit</span>
            </button>

            <div class="px-2 py-1 flex items-center gap-1 ">
              <button class="bg-orange-50 px-5 py-1 text-sm font-bold">LOGIN</button>
              <button class="bg-orange-400 px-5 py-1 text-sm font-bold">JOIN</button>
            </div>

          

           
          </div>
        </div>

        <!-- Second Row: Horizontal Scroll Navigation - INAONEKANA KWA SIMU PIA! -->
        <div class="relative mt-2">
          <!-- Scroll Container - Hakuna lg:hidden tena! -->
          <div class="overflow-x-auto scrollbar-thin scroll-smooth hide-scrollbar ">
            <div class="flex items-center space-x-1 min-w-max px-1">
              <router-link 
                to="/" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span>Home</span>
                </div>
              </router-link>
              
              <router-link 
                to="/sport" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <span class="text-xs"> ⚽</span>
                  <span>Football</span>
                </div>
              </router-link>
              
              <router-link 
                to="/basketball" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Basketball</span>
                </div>
              </router-link>
              
              <router-link 
                to="/tennis" 
                class="px-1 py-2 text-gray-300 hover:text-white rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Tennis</span>
                </div>
              </router-link>
              
              <router-link 
                to="/live" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <div class="relative">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span class="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </div>
                  <span>Live Betting</span>
                </div>
              </router-link>
              
              <router-link 
                to="/casino" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <span>Casino</span>
                </div>
              </router-link>
              
              <router-link 
                to="/virtual" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span>Virtual Sports</span>
                </div>
              </router-link>
              
              <router-link 
                to="/e-sports" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>E-Sports</span>
                </div>
              </router-link>
              
              <router-link 
                to="/promotions" 
                class="px-1 py-2 text-gray-300 hover:text-white  rounded-lg transition-all duration-200 whitespace-nowrap"
                active-class="text-white bg-cyan-950"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  <span>Promotions</span>
                  <span class="px-1.5 py-0.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white text-xs rounded-full">New</span>
                </div>
              </router-link>
            </div>
          </div>
          
          <!-- Gradient Shadows for Scroll Indication -->
          <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cyan-900 to-transparent pointer-events-none"></div>
          <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cyan-900 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>


  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/AuthStore'

const router = useRouter()
const authStore = useAuthStore()

// UI State
const showUserMenu = ref(false)
const showMobileMenu = ref(false) // Iko tu kwa ajili ya mobile icon, lakini haitumiki kwa navigation collapse tena

// Computed
const userInitial = computed(() => {
  const phone = authStore.user?.phone_number || ''
  const lastFour = phone.slice(-4)
  return lastFour || 'U'
})

const formattedPhone = computed(() => {
  const phone = authStore.user?.phone_number || ''
  if (!phone) return 'Guest'
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0,3)} ${cleaned.slice(3,6)} ${cleaned.slice(6,9)} ${cleaned.slice(9,12)}`
  }
  return cleaned
})

const memberSince = computed(() => {
  const date = authStore.user?.created_at
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

const formatBalance = computed(() => {
  const balance = authStore.user?.balance || 0
  return balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  // Ikiwa hutaki mobile icon yoyote, futa hii method na uiondoe button ya menu.
  // Kwa sasa nimeiacha ili uweze ku-expand au ku-collapse kitu kingine (kama sidebar)
  showMobileMenu.value = !showMobileMenu.value
}

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/login')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (showUserMenu.value && !event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Smooth transitions */
.router-link-active {
  background-color: rgba(139, 92, 246, 0.1);
}

/* Hover effects */
button, .router-link {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for horizontal navigation - inaonekana kwenye devices zote */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.hide-scrollbar {
scrollbar-width: none;
-ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
display: none;
}
</style>