<template>
  <div class="flex flex-col h-full">
            <div class="">
              <Header/>
            </div>
            <div class="flex min-h-0 flex-row ">

              <div class="hidden lg:flex-[24%]">
                <SideBar />
              </div>
              <div class="flex-1 bg-pink-50 overflow-y-auto scroll-smooth hide-scrollbar ">
                <RouterView />
              </div>
              <div class="hidden md:flex-[24%]">
                <BetSlip />
              </div>

    </div>

    <div class=" md:hidden">
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
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}
</style>