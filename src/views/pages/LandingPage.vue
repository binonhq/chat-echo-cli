<script lang="ts">
import { defineComponent } from 'vue'
import { Label } from '@/components/ui/label'
import { BRAND_NAME } from '@/constants/constant.ts'
import { Button } from '@/components/ui/button'
import Logo from '@/views/components/Logo.vue'

export default defineComponent({
  name: 'LandingPage',
  components: { Logo, Button, Label },
  setup() {
    return {
      BRAND_NAME
    }
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen px-52">
    <div class="flex items-center mt-10 justify-between">
      <Logo show-name/>
      <div class="flex gap-8 items-center">
        <h2 class="text-md font-semibold">About us</h2>
        <router-link to="/login" class="text-md font-semibold">
         Login
        </router-link>
        <router-link to="/login">
          <Button class="px-10">Get started free</Button>
        </router-link>
      </div>
    </div>
    <div class="grid grid-cols-2 h-full grow">
      <div class="text-left my-auto max-w-3xl">
        <h1 class="text-5xl w-full font-bold leading-tight">Start chatting with your friends, anytime, anywhere, by your voice, with <span class="text-primary">ChatEcho</span></h1>
        <h2 class="max-w-md text-left mr-auto mt-8 text-md text-gray-500 text-light">Great software that allows you to chat from any place at any time without any interruption.</h2>
        <router-link to="/login">
          <Button class="pr-8 pl-10 mt-8 flex gap-2">Start chatting now
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Button>
        </router-link>
        <img class="mt-32" src="@/assets/images/landing2.png" alt="Landing 2">
      </div>
      <img class="mx-auto mt-auto" src="@/assets/images/landing1.png" alt="Landing">
    </div>
  </div>
</template>
