<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { AlertCircle } from 'lucide-vue-next'

export default defineComponent({
  name: 'LoginPage',
  components: { AlertCircle },
  setup() {
    const router = useRouter()
    const { login, isAuthenticated } = useAuth()
    const errorMessage = ref('')
    const isShowPassword = ref(false)

    const toggleShowPassword = () => {
      isShowPassword.value = !isShowPassword.value
    }

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
      errorMessage.value = ''
      const response = await login(values.email, values.password)
      if (!response.success && response.errorMessage) {
        errorMessage.value = response.errorMessage
        return
      }
      if (response.success) {
        await router.push('/chat/1')
      }
    })

    watch(() => isAuthenticated.value, (isAuthenticated) => {
      if (isAuthenticated) {
        router.push('/chat/1')
      }
    }, {
      immediate: true
    })

    return {
      onSubmit,
      errorMessage,
      isShowPassword,
      toggleShowPassword
    }
  }
})
</script>

<template>
  <div class="grid min-h-screen xl:grid-cols-2">
    <div class="mx-auto w-full max-w-2xl p-10">
      <Logo show-name size="big" />
      <div class="mt-32">
        <h2 class="text-4xl font-semibold">Welcome back</h2>
        <h2 class="mt-2 font-light">Sign in with your account!</h2>
        <h2 class="mt-5">Don't have an account?
          <router-link class="text-primary hover:underline" to="/register">
            Register here.
          </router-link>
        </h2>
      </div>
      <div class="mt-10 flex justify-center gap-5">
        <div class="h-10 w-10 rounded-full border-gray-400 border-[1px]">
        </div>
        <div class="h-10 w-10 rounded-full border-gray-400 border-[1px]">
        </div>
        <div class="h-10 w-10 rounded-full border-gray-400 border-[1px]">
        </div>
        <div class="h-10 w-10 rounded-full border-gray-400 border-[1px]">
        </div>
      </div>
      <div class="my-10 flex w-full items-center justify-center px-20">
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
            <div class="relative flex items-center">
              <Input
                :type="isShowPassword ? 'text' : 'password'"
                class="relative"
                placeholder="Password"
                v-bind="componentField"
              >
              </Input>
              <div class="absolute right-3 cursor-pointer" @click="toggleShowPassword">
                <svg v-if="!isShowPassword" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </FormControl>
          <div class="h-5">
            <FormMessage class="font-light" />
          </div>
        </FormItem>
      </FormField>

      <Alert v-if="errorMessage" class="" variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {{ errorMessage }}
        </AlertDescription>
      </Alert>

      <Button class="mt-5 w-full" type="submit" @click="onSubmit"
      >Sign in
      </Button>
    </div>
    <div class="hidden p-8 xl:block">
      <img alt="Login" class="h-full w-full object-cover rounded-[40px]"
           src="@/assets/images/login_landing2.jpg">
    </div>
  </div>
</template>

<style scoped>

</style>