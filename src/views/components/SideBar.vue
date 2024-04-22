<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SideBar',
  setup() {
    const route = useRoute()
    const path = computed(() => route.path.split('/')[1])
    return {
      path
    }
  }
})
</script>

<template>
  <div
    class="flex flex-col bg-gray-100 px-3 pb-10 items-center gap-10">
    <div class="items-center my-10">
      <Logo />
    </div>
    <router-link
      :class="['hover:bg-primary p-3 rounded-full transform duration-150 hover:text-white', { 'bg-primary text-white' : path === 'chat'}]"
      to="/chat/1">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </router-link>
    <router-link
      :class="['hover:bg-primary p-3 rounded-full transform duration-150 hover:text-white', { 'bg-primary text-white' : path === 'setting'}]"
      to="/setting">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </router-link>
    <router-link
      class="hover:bg-primary p-3 rounded-full transform duration-150 hover:text-white mt-auto"
      to="/register">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>

</style>