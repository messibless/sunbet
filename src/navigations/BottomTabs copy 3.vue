<template>
    <div class="fixed bottom-0 left-0 right-0 z-50">
      <!-- Main Bottom Navigation Bar -->
      <div class="bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-900 backdrop-blur-lg border-t border-gray-700/50 shadow-2xl">
        <div class="flex items-center justify-around px-4 py-2">
          
          <!-- Home Tab - Router Link -->
          <router-link 
            to="/"
            custom
            v-slot="{ navigate, isActive }"
          >
            <button 
              @click="navigate; activeTab = 'home'"
              class="flex flex-col items-center justify-center space-y-1 group relative"
              :class="isActive || activeTab === 'home' ? 'text-cyan-100' : 'text-gray-400 hover:text-gray-300'"
            >
              <!-- Active Indicator -->
              <div v-if="isActive || activeTab === 'home'" class="absolute -top-2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              
              <!-- Icon -->
              <div class="relative">
                <svg class="w-6 h-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                
                <!-- Badge Example (if needed) -->
                <span v-if="hasNotifications" class="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              
              <!-- Label -->
              <span class="text-xs font-medium mt-1">Home</span>
            </button>
          </router-link>

          <!-- Sport Tab - Replaced More with Sport -->
          <router-link 
            to="/sport"
            custom
            v-slot="{ navigate, isActive }"
          >
            <button 
              @click="navigate; activeTab = 'sport'"
              class="flex flex-col items-center justify-center space-y-1 group relative"
              :class="isActive || activeTab === 'sport' ? 'text-cyan-100' : 'text-gray-400 hover:text-gray-300'"
            >
              <!-- Active Indicator -->
              <div v-if="isActive || activeTab === 'sport'" class="absolute -top-2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              
              <!-- Icon -->
              <svg class="w-6 h-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              
              <!-- Label -->
              <span class="text-xs font-medium mt-1">Sport</span>
            </button>
          </router-link>
  
          <!-- Betslip Tab (Center - Premium Feature) - Router Link -->
          <router-link 
            to="/betslip"
            custom
            v-slot="{ navigate, isActive }"
          >
            <button 
              @click="navigate; activeTab = 'betslip'"
              class="flex flex-col items-center justify-center space-y-1 group relative "
              :class="isActive || activeTab === 'betslip' ? 'text-cyan-100' : 'text-gray-400 hover:text-gray-300'"
            >
              <!-- Premium Floating Effect -->
              <div class="absolute   flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-500/50">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                
                <!-- Bet Count Badge -->
                <!-- <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {{ betCount }}
                </span> -->
              </div>
              
              <!-- Label -->
              <span class="text-xs font-medium mt-9" :class="isActive || activeTab === 'betslip' ? 'text-purple-400' : 'text-gray-400'">Betslip</span>
            </button>
          </router-link>
  
          <!-- My Bets Tab - Router Link -->
          <router-link 
            to="/mybets"
            custom
            v-slot="{ navigate, isActive }"
          >
            <button 
              @click="navigate; activeTab = 'mybets'"
              class="flex flex-col items-center justify-center space-y-1 group relative"
              :class="isActive || activeTab === 'mybets' ? 'text-cyan-100' : 'text-gray-400 hover:text-gray-300'"
            >
              <!-- Active Indicator -->
              <div v-if="isActive || activeTab === 'mybets'" class="absolute -top-2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              
              <!-- Icon -->
              <svg class="w-6 h-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              
              <!-- Label -->
              <span class="text-xs font-medium mt-1">My Bets</span>
            </button>
          </router-link>

          <!-- Account Tab - Router Link -->
          <router-link 
            to="/account"
            custom
            v-slot="{ navigate, isActive }"
          >
            <button 
              @click="navigate; activeTab = 'account'"
              class="flex flex-col items-center justify-center space-y-1 group relative"
              :class="isActive || activeTab === 'account' ? 'text-cyan-100' : 'text-gray-400 hover:text-gray-300'"
            >
              <!-- Active Indicator -->
              <div v-if="isActive || activeTab === 'account'" class="absolute -top-2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              
              <!-- Icon -->
              <svg class="w-6 h-6 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              
              <!-- Label -->
              <span class="text-xs font-medium mt-1">Account</span>
            </button>
          </router-link>
  
        </div>
        
        <!-- Safe Area for Notch/Home Indicator (iOS) -->
        <div class="h-1 bg-transparent"></div>
      </div>
      
      <!-- Optional: Top Shadow for Depth -->
      <div class="absolute -top-5 left-0 right-0 h-5 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  // Active tab state
  const activeTab = ref('home')
  
  // Example bet count for betslip badge
  const betCount = ref(3)
  
  // Example notification flag
  const hasNotifications = ref(true)
  
  // You can watch for changes and emit events
  const emit = defineEmits(['tab-change'])
  
  // Watch route changes to update active tab
  watch(() => route.path, (newPath) => {
    const path = newPath.replace('/', '')
    if (path === '' || path === 'home') {
      activeTab.value = 'home'
    } else if (path === 'sport' || path === 'football') {
      activeTab.value = 'sport'
    } else if (path === 'betslip') {
      activeTab.value = 'betslip'
    } else if (path === 'mybets') {
      activeTab.value = 'mybets'
    } else if (path === 'account') {
      activeTab.value = 'account'
    }
    emit('tab-change', activeTab.value)
  }, { immediate: true })
  
  // Watch active tab changes
  watch(activeTab, (newTab) => {
    emit('tab-change', newTab)
  })
  
  // Expose for parent component
  defineExpose({
    activeTab,
    setActiveTab: (tab) => { activeTab.value = tab }
  })
  </script>
  
  <style lang="scss" scoped>
  /* Premium Animations */
  button {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  /* Gradient Background for Active Tab Indicator */
  .bg-gradient-to-r {
    background-size: 200% auto;
    animation: shimmer 2s linear infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  
  /* Floating Animation for Betslip Button */
  .group:hover .absolute {
    animation: float 0.5s ease-in-out;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  /* Ripple Effect on Click */
  button {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(139, 92, 246, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s;
    }
    
    &:active::after {
      width: 100px;
      height: 100px;
    }
  }
  
  /* Premium Glass Effect on Active Tab */
  button[class*="text-purple-400"] {
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
  }
  
  /* Custom Scrollbar for Bottom Bar (if needed) */
  ::-webkit-scrollbar {
    width: 3px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1f2937;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
    border-radius: 20px;
  }
  </style>