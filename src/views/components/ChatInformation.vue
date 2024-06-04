<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'ChatInformation',
  components: { Icon },
  setup(props, { emit }) {
    const toggleHideChatInformation = () => {
      emit('toggle-show-chat-information', false)
    }
    return {
      toggleHideChatInformation
    }
  }
})
</script>

<template>
  <div
    class="flex h-screen flex-col items-center gap-4 border-gray-300 p-5 w-[400px] border-l-[1px]">
    <div class="flex w-full items-center justify-between">
      <h1 class="font-semibold">Information</h1>
      <div @click="toggleHideChatInformation">
        <Icon class="size-5 text-primary cursor-pointer" icon="lucide:x" />
      </div>
    </div>
    <Avatar
      image="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841"
      online
    />
    <p class="text-center text-2xl font-semibold">Phan Hoai Thuong</p>
    <div class="flex justify-center gap-3">
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
    <div class="flex w-full justify-between">
      <h2 class="font-semibold">Shared files</h2>
      <h2 class="text-sm text-blue-500">See all</h2>
    </div>
    <div class="flex w-full flex-col gap-4 overflow-y-scroll">
      <div v-for="i in [1,2,3,4,5]" :key="i" class="flex w-full items-center justify-start gap-4">
        <img
          alt="test"
          class="size-20 rounded-[10px]"
          src="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841">
        <h2>asdnaksdnasjdn.jpg</h2>
      </div>
    </div>
    <Separator class="w-full" />
    <div class="flex w-full justify-between">
      <h2 class="font-semibold">Shared Links</h2>
      <h2 class="text-sm text-blue-500">See all</h2>
    </div>
    <div class="flex w-full flex-col gap-4 overflow-y-scroll">
      <div v-for="i in [1,2,3,4,5]" :key="i" class="flex w-full items-center justify-start gap-3">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <h2 class="cursor-pointer font-light hover:underline">asdnaksdnasjdn.jpg</h2>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>