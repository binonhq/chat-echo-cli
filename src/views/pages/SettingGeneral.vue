<script lang="ts">
import { defineComponent } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

export default defineComponent({
  name: 'SettingGeneral',
  components: { Checkbox },
  setup() {
    const customColor = [
      {
        color: '#FF0000',
        name: 'Red'
      },
      {
        color: '#00FF00',
        name: 'Green'
      },
      {
        color: '#0000FF',
        name: 'Blue'
      },
      {
        color: '#FFFF00',
        name: 'Yellow'
      },
      {
        color: '#FF00FF',
        name: 'Pink'
      },
      {
        color: '#00FFFF',
        name: 'Cyan'
      }
    ]
    return {
      customColor
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h2 class="text-2xl font-semibold">General</h2>
    <div class="flex flex-col gap-8">
      <div>
        <h2 class="text-lg">Select Theme</h2>
        <p class="text-[10pt] text-gray-500">
          Select your workspace, make it custom to be more comfortable for you
          to enjoy
        </p>
      </div>
      <div class="flex gap-10">
        <div
          class="border-[1px] rounded-md overflow-hidden hover:border-primary duration-200"
        >
          <img
            alt="light"
            class="object-cover w-72 h-36"
            src="https://nighteye.app/wp-content/uploads/2022/05/what-is-dark-ui-2.jpg"
          />
          <div class="flex items-center p-3 gap-3">
            <Checkbox id="light-mode" />
            <label class="text-sm" for="light-mode"> Light Theme </label>
          </div>
        </div>
        <div
          class="border-[1px] rounded-md overflow-hidden hover:border-primary duration-200"
        >
          <img
            alt="light"
            class="object-cover w-72 h-36"
            src="https://nighteye.app/wp-content/uploads/2022/05/what-is-dark-ui-2.jpg"
          />
          <div class="flex items-center p-3 gap-3">
            <Checkbox id="dark-mode" />
            <label class="text-sm" for="dark-mode"> Dark Theme </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
