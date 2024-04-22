<script lang="ts">
import { defineComponent } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const { login } = useAuth()

    const registerFormValidate = toTypedSchema(z.object({
        email: z.string({
          required_error: 'Email is required'
        }).email({
          message: 'Invalid email address'
        }),
        password: z.string({
          required_error: 'Password is required'
        }).min(6, {
          message: 'Password must be at least 6 characters'
        })
      })
    )

    const { handleSubmit } = useForm({
      validationSchema: registerFormValidate
    })

    const onSubmit = handleSubmit(async (values) => {
      await login(values.email, values.password)
      await router.push('/chat/1')
    })

    return {
      onSubmit
    }
  }
})
</script>

<template>
  <div class="min-h-screen grid xl:grid-cols-2">
    <div class="p-10 max-w-2xl w-full mx-auto">
      <Logo show-name size="big" />
      <div class="mt-32">
        <h2 class="text-4xl font-semibold">Welcome back</h2>
        <h2 class="font-light mt-2">Sign in with your account!</h2>
        <h2 class="mt-5">Don't have an account?
          <router-link class="text-primary hover:underline" to="/register">
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
      <div class="w-full my-10 flex items-center justify-center px-20">
        <Separator class="w-1/2" />
        <h2 class="mx-2 text-sm">OR</h2>
        <Separator class="w-1/2" />
      </div>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="Email"
              type="email"
              v-bind="componentField"
            />
          </FormControl>
          <div class="h-5">
            <FormMessage class="font-light" />
          </div>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="!mt-2">
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              placeholder="Password"
              type="password"
              v-bind="componentField"
            />
          </FormControl>
          <div class="h-5">
            <FormMessage class="font-light" />
          </div>
        </FormItem>
      </FormField>

      <Button class="w-full mt-5" type="submit" @click="onSubmit"
      >Sign in
      </Button>
    </div>
    <div class="p-8 hidden xl:block">
      <img alt="Login" class="w-full h-full object-cover rounded-[40px]"
           src="@/assets/images/login_landing2.jpg">
    </div>
  </div>
</template>

<style scoped>

</style>