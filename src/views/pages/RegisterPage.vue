<script lang="ts">
import { defineComponent } from 'vue'
import { Input } from '@/components/ui/input'

export default defineComponent({
  name: 'RegisterPage',
  components: { Input }
})
</script>

<template>
  <div class="min-h-screen grid xl:grid-cols-2">
    <div class="hidden xl:block w-full h-full p-10">
      <div class="bg-stone-800 w-full h-full rounded-[50px]"></div>
    </div>
    <div class="p-10 max-w-2xl w-full mx-auto">
      <h1 class="text-6xl">Bino</h1>
      <div class="mt-32">
        <h2 class="text-4xl font-semibold">Register</h2>
        <h2 class="font-light">Create your own account and enjoy the app</h2>
        <h2 class="mt-5">Already have an account?
          <router-link class="text-blue-600 hover:underline" to="/login">
            Login here.
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
        </div>
        <div class="space-y-2">
          <Label>Confirm password</Label>
          <Input placeholder="Confirm your password" />
        </div>
      </div>
      <router-link class="w-full" to="/chat/1">
        <Button class="w-full mt-10">Sign up</Button>
      </router-link>
    </div>
  </div>

</template>

<style scoped>

</style>