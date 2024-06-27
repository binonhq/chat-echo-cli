<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { Textarea as TextArea } from '@/components/ui/textarea'
import { mainAxios } from '@/main.ts'
import { toast } from '@/components/ui/toast'

export default defineComponent({
  name: 'SettingPersonalInfo',
  components: { TextArea },
  setup() {
    const { currentUser, getCurrentUser } = useAuth()

    const profileFormSchema = toTypedSchema(
      z.object({
        firstName: z
          .string()
          .min(2, {
            message: 'Name must be at least 2 characters.'
          })
          .max(30, {
            message: 'Name must not be longer than 30 characters.'
          }),
        lastName: z
          .string()
          .min(2, {
            message: 'Name must be at least 2 characters.'
          })
          .max(30, {
            message: 'Name must not be longer than 30 characters.'
          }),
        email: z.string(),
        about: z
          .string()
          .max(500, {
            message: 'About must not be longer than 500 characters.'
          })
          .optional(),
        phone: z
          .string()
          .max(11, { message: 'Phone must not be longer than 10 characters.' })
          .optional()
      })
    )

    const { handleSubmit, resetForm } = useForm({
      validationSchema: profileFormSchema
    })

    resetForm({
      values: {
        firstName: currentUser.value.firstName || '',
        lastName: currentUser.value.lastName || '',
        email: currentUser.value.email || '',
        phone: currentUser.value.phone || '',
        about: currentUser.value.about || ''
      }
    })

    const onSubmit = handleSubmit(async (values) => {
      const data = {
        firstName: values.firstName || currentUser.value.firstName,
        lastName: values.lastName || currentUser.value.lastName,
        email: values.email || currentUser.value.email,
        phone: values.phone || currentUser.value.phone,
        about: values.about || currentUser.value.about
      }
      try {
        await mainAxios.put('/auth/update_profile', data)
        toast({
          title: 'Update profile successfully!'
        })
        await getCurrentUser()
      } catch (error) {
        toast({
          title: 'Update profile failed!',
          description: error.response.data.message
        })
      }
    })

    return { currentUser, onSubmit }
  }
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h2 class="text-2xl font-semibold">Personal Information</h2>
    <form class="flex flex-col gap-3 w-full" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input disabled type="text" v-bind="componentField" />
          </FormControl>
          <div class="h-5">
            <FormMessage class="font-light" />
          </div>
        </FormItem>
      </FormField>

      <div class="grid grid-cols-2 gap-10">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>First name</FormLabel>
            <FormControl>
              <Input placeholder="John" type="text" v-bind="componentField" />
            </FormControl>
            <div class="h-5">
              <FormMessage class="font-light" />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" type="text" v-bind="componentField" />
            </FormControl>
            <div class="h-5">
              <FormMessage class="font-light" />
            </div>
          </FormItem>
        </FormField>
      </div>

      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input
              placeholder="0123456789"
              type="text"
              v-bind="componentField"
            />
          </FormControl>
          <div class="h-5">
            <FormMessage class="font-light" />
          </div>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="about">
        <FormItem>
          <FormLabel>About</FormLabel>
          <FormControl>
            <TextArea
              class="px-4 py-3 min-h-36 resize-none"
              placeholder="Tell us about yourself"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="mt-10 w-fit" type="submit"> Update profile</Button>
    </form>
  </div>
</template>

<style scoped></style>
