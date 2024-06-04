<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  setup() {
    const isShowTime = ref(false)
    const toggleTime = () => {
      isShowTime.value = !isShowTime.value
    }
    return { isShowTime, toggleTime }
  }
})
</script>

<template>
  <div v-if="message.isMe" class="ml-auto max-w-1/2">
    <div class="flex rounded-full rounded-br-none bg-gray-100 px-7 py-4" @click="toggleTime">
      <p>{{ message.message }}</p>
    </div>
    <p v-if="isShowTime" class="mt-1 text-end text-gray-600 text-[9pt]">10:00 PM</p>
  </div>
  <div v-else class="mr-auto max-w-1/2">
    <div class="flex rounded-full rounded-bl-none bg-cyan-200 px-7 py-4" @click="toggleTime">
      <p>{{ message.message }}</p>
    </div>
    <p v-if="isShowTime" class="mt-1 text-gray-600 text-[9pt]">10:00 PM</p>
  </div>
</template>

<style scoped>

</style>