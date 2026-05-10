<template>
  <div class="flex flex-col h-screen">
    <!-- Header - fixed at top -->
    <div class="flex-shrink-0">
      <Header/>
    </div>
    
    <!-- Main content row -->
    <div class="flex flex-1 min-h-0 overflow-hidden">
      
      <!-- Sidebar - fixed width -->
      <div class="hidden lg:block w-64 flex-shrink-0">
        <SideBar />
      </div>
      
      <!-- Main content - takes remaining space -->
      <div class="flex-1 bg-gray-900 overflow-y-auto h-full scroll-smooth hide-scrollbar pb-10">
        <RouterView />
      </div>
      
      <!-- BetSlip - fixed width -->
      <div class="hidden md:block w-80 flex-shrink-0 min-h-full">
        <BetSlip />
      </div>
      
    </div>

    <!-- Bottom tabs - mobile only -->
    <div class="md:hidden flex-shrink-0">
      <BottomTabs />
    </div>
  </div>
</template>

<script setup>
import Header from '../header/Header.vue'
import BottomTabs from '../../navigations/BottomTabs.vue';
import SideBar from '../sidebar/SideBar.vue';
import BetSlip from '../../screens/BetSlips/BetSlip.vue';
</script>

<style lang="scss" scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>