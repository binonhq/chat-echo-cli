<script lang="ts">
import { defineComponent } from 'vue'
import { Label } from '@/components/ui/label'
import { BRAND_NAME } from '@/constants/constant.ts'
import { Button } from '@/components/ui/button'

export default defineComponent({
  name: 'LandingPage',
  components: { Button, Label },
  setup() {
    return {
      BRAND_NAME
    }
  }
})
</script>

<template>
  <div class="flex flex-col justify-between min-h-screen px-20 py-10">
    <Label class="text-xl">{{ BRAND_NAME }}</Label>
    <div class="text-center flex flex-col items-center gap-2">
      <h1 class="text-6xl text-center w-full">Connect with your friends easily</h1>
      <h2 class="text-2xl font-thin">The best application for your communication</h2>
      <div class="flex gap-2 mt-2">
        <router-link to="/login">
          <Button class="w-32">Login</Button>
        </router-link>
        <router-link to="/register">
          <Button class="w-32" variant="secondary">Sign up</Button>
        </router-link>
      </div>
    </div>
    <div>Footer</div>
  </div>
</template>
