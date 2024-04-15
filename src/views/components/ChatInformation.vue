<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatInformation'
})
</script>

<template>
  <div
    class="flex flex-col items-center w-[400px] p-10 gap-4 h-screen border-l-[1px] border-gray-300">
    <div class="flex justify-between w-full items-center">
      <h1 class="font-semibold">Information</h1>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>
    <div class="w-32 h-32 relative mt-10">
      <img
        alt="avatar"
        class="rounded-full"
        src="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841">
      <div class="absolute w-4 h-4 rounded-full bg-amber-300 right-[16px] bottom-[7px]"></div>
    </div>
    <p class="font-semibold text-center text-2xl">Phan Hoai Thuong</p>
    <div class="flex gap-3 justify-center">
      <svg style="fill:#3d3939;" viewBox="0,0,256,256" width="25" x="0px"
           xmlns="http://www.w3.org/2000/svg"
           y="0px">
        <g fill="#b4acac" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none"
           stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
          <g transform="scale(10.66667,10.66667)">
            <path
              d="M12,2c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c5.511,0 10,-4.489 10,-10c0,-5.511 -4.489,-10 -10,-10zM12,4c4.43012,0 8,3.56988 8,8c0,4.01447 -2.93468,7.31302 -6.78125,7.89844v-5.51367h2.32813l0.36523,-2.36524h-2.69336v-1.29297c0,-0.983 0.32023,-1.85547 1.24023,-1.85547h1.47656v-2.06445c-0.26,-0.035 -0.8087,-0.11133 -1.8457,-0.11133c-2.166,0 -3.43555,1.144 -3.43555,3.75v1.57422h-2.22656v2.36524h2.22656v5.49414c-3.78401,-0.63806 -6.6543,-3.90867 -6.6543,-7.87891c0,-4.43012 3.56988,-8 8,-8z"></path>
          </g>
        </g>
      </svg>
      <svg style="fill:#3d3939;" viewBox="0,0,256,256" width="25" x="0px"
           xmlns="http://www.w3.org/2000/svg"
           y="0px">
        <g fill="#b4acac" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none"
           stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
          <g transform="scale(10.66667,10.66667)">
            <path
              d="M12,2c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c5.511,0 10,-4.489 10,-10c0,-5.511 -4.489,-10 -10,-10zM12,4c4.43012,0 8,3.56988 8,8c0,4.01447 -2.93468,7.31302 -6.78125,7.89844v-5.51367h2.32813l0.36523,-2.36524h-2.69336v-1.29297c0,-0.983 0.32023,-1.85547 1.24023,-1.85547h1.47656v-2.06445c-0.26,-0.035 -0.8087,-0.11133 -1.8457,-0.11133c-2.166,0 -3.43555,1.144 -3.43555,3.75v1.57422h-2.22656v2.36524h2.22656v5.49414c-3.78401,-0.63806 -6.6543,-3.90867 -6.6543,-7.87891c0,-4.43012 3.56988,-8 8,-8z"></path>
          </g>
        </g>
      </svg>
      <svg style="fill:#3d3939;" viewBox="0,0,256,256" width="25" x="0px"
           xmlns="http://www.w3.org/2000/svg"
           y="0px">
        <g fill="#b4acac" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none"
           stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
          <g transform="scale(10.66667,10.66667)">
            <path
              d="M12,2c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c5.511,0 10,-4.489 10,-10c0,-5.511 -4.489,-10 -10,-10zM12,4c4.43012,0 8,3.56988 8,8c0,4.01447 -2.93468,7.31302 -6.78125,7.89844v-5.51367h2.32813l0.36523,-2.36524h-2.69336v-1.29297c0,-0.983 0.32023,-1.85547 1.24023,-1.85547h1.47656v-2.06445c-0.26,-0.035 -0.8087,-0.11133 -1.8457,-0.11133c-2.166,0 -3.43555,1.144 -3.43555,3.75v1.57422h-2.22656v2.36524h2.22656v5.49414c-3.78401,-0.63806 -6.6543,-3.90867 -6.6543,-7.87891c0,-4.43012 3.56988,-8 8,-8z"></path>
          </g>
        </g>
      </svg>
    </div>
    <Separator class="w-full" />
    <div class="flex justify-between w-full ">
      <h2 class="font-semibold">Shared files</h2>
      <h2 class="text-sm text-blue-500">See all</h2>
    </div>
    <div class="flex flex-col gap-4 overflow-y-scroll w-full">
      <div v-for="i in [1,2,3,4,5]" :key="i" class="flex items-center gap-4 w-full justify-start">
        <img
          alt="test"
          class="size-20 rounded-[10px]"
          src="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841">
        <h2>asdnaksdnasjdn.jpg</h2>
      </div>
    </div>
    <Separator class="w-full" />
    <div class="flex justify-between w-full ">
      <h2 class="font-semibold">Shared Links</h2>
      <h2 class="text-sm text-blue-500">See all</h2>
    </div>
    <div class="flex flex-col gap-4 overflow-y-scroll w-full">
      <div v-for="i in [1,2,3,4,5]" :key="i" class="flex items-center gap-3 w-full justify-start">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <h2 class="hover:underline cursor-pointer font-light">asdnaksdnasjdn.jpg</h2>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>