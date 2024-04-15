<script lang="ts">
import { defineComponent } from 'vue'
import { Separator } from '@/components/ui/separator'
import FriendsOnline from '@/views/components/FriendsOnline.vue'
import ChatHistory from '@/views/components/ChatHistory.vue'

export default defineComponent({
  name: 'MyProfileBar',
  components: { ChatHistory, FriendsOnline, Separator }
})
</script>

<template>
  <div class="flex flex-col items-center w-[400px] py-10 gap-4 px-10 h-screen border-r-[1px] border-gray-300">
    <div class="w-32 h-32 relative">
      <img
        alt="avatar"
        class="rounded-full"
        src="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841">
      <div class="absolute w-4 h-4 rounded-full bg-amber-300 right-[16px] bottom-[7px]"></div>
    </div>
    <h1 class="text-2xl font-semibold mt-2">HThuong</h1>
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
    <FriendsOnline />
    <Separator class="w-full" />
    <ChatHistory />
  </div>
</template>

<style scoped>

</style>