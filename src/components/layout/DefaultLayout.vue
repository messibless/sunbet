<template>
    <div class="flex flex-col h-screen">
        <Header/>
        <div class="flex  flex-row h-full">
            
            <div class="hidden lg:flex">
                <SideBar/>
            </div>
          <div class="flex-1 bg-pink-50">
            <RouterView/>
          </div>
          <div class="hidden md:flex">
            <BetSlip/>
          </div>
             
        </div>

        <div class=" md:hidden">
            <BottomTabs/>
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

</style>