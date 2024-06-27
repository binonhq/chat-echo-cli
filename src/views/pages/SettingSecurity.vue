<script lang="ts">
import { defineComponent } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'

export default defineComponent({
  name: 'SettingSecurity',
  setup() {
    const passwordFormSchema = toTypedSchema(
      z
        .object({
          newPassword: z.string(),
          oldPassword: z.string(),
          cfNewPassword: z.string()
        })
        .refine((data) => data.newPassword !== data.oldPassword, {
          message: 'The same old and new password',
          path: ['newPassword']
        })
        .refine((data) => data.newPassword === data.cfNewPassword, {
          message: "Passwords don't match",
          path: ['cfNewPassword']
        })
    )

    const { handleSubmit } = useForm({
      validationSchema: passwordFormSchema
    })

    const onSubmit = handleSubmit(async (values) => {
      try {
        await mainAxios.put('/auth/update_password', {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.cfNewPassword
        })
        toast({
          title: 'Password changed successfully!'
        })
      } catch (error) {
        toast({
          title: 'Failed to change password',
          description: error.response.data.message
        })
      }
    })
    return { onSubmit }
  }
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h2 class="text-2xl font-semibold">Security</h2>
    <div class="flex flex-col gap-8">
      <div>
        <h2 class="text-lg">Change Password</h2>
        <p class="text-[10pt] text-gray-500">
          Change your password to keep your account secure
        </p>
      </div>
      <form class="flex flex-col gap-6 h-full" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="oldPassword">
          <FormItem>
            <FormLabel>Recent password</FormLabel>
            <FormControl>
              <Input
                placeholder="Recent password"
                type="password"
                v-bind="componentField"
              />
            </FormControl>
            <div class="h-5">
              <FormMessage class="font-light" />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="newPassword">
          <FormItem>
            <FormLabel>New password</FormLabel>
            <FormControl>
              <Input
                placeholder="New password"
                type="password"
                v-bind="componentField"
              />
            </FormControl>
            <div class="h-5">
              <FormMessage class="font-light" />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="cfNewPassword">
          <FormItem>
            <FormLabel>Confirm new password</FormLabel>
            <FormControl>
              <Input
                placeholder="Confirm new password"
                type="password"
                v-bind="componentField"
              />
            </FormControl>
            <div class="h-5">
              <FormMessage class="font-light" />
            </div>
          </FormItem>
        </FormField>

        <Button class="w-fit" type="submit"> Update password</Button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
