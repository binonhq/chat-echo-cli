<script lang="ts">
import { defineComponent } from 'vue'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default defineComponent({
  name: 'LoginPage',
  components: { Label, Input, Separator }
})
</script>

<template>
  <div class="min-h-screen grid grid-cols-2">
    <div class="p-10">
      <h1 class="text-6xl">Bino</h1>
      <div class="mt-32">
        <h2 class="text-4xl font-semibold">Welcome back</h2>
        <h2 class="font-light">Sign in with your account!</h2>
        <h2 class="mt-5">Don't have an account?
          <router-link class="text-blue-600 hover:underline" to="/register">
            Register here.
          </router-link>
        </h2>
      </div>
      <div class="flex justify-center gap-5 mt-10">
        <div class="rounded-full border-gray-400 border-[1px] w-10 h-10">
        </div>
        <div class="rounded-full border-gray-400 border-[1px] w-10 h-10">
        </div>
        <div class="rounded-full border-gray-400 border-[1px] w-10 h-10">
        </div>
        <div class="rounded-full border-gray-400 border-[1px] w-10 h-10">
        </div>
      </div>
      <div class="w-full mt-10 flex items-center justify-center px-20">
        <Separator class="w-1/2" />
        <h2 class="mx-2 text-sm">OR</h2>
        <Separator class="w-1/2" />
      </div>
      <div class="space-y-3 mt-10 mb-3">
        <div class="space-y-2">
          <Label>Username</Label>
          <Input placeholder="Username" />
        </div>
        <div class="space-y-2">
          <Label>Password</Label>
          <Input placeholder="Password" />
          <h3 class="text-gray-600 text-sm hover:underline cursor-pointer text-end italic">Forgot your password?</h3>
        </div>
      </div>
      <router-link class="w-full" to="/chat/1">
        <Button class="w-full">Sign in</Button>
      </router-link>
    </div>
    <div class="w-full h-full p-10">
      <div class="bg-stone-800 w-full h-full rounded-[50px]"></div>
    </div>
  </div>
</template>

<style scoped>

</style>