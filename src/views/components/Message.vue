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
  <div v-if="message.isMe" class="max-w-1/2 ml-auto">
    <div class="flex px-7 py-4 bg-gray-100  rounded-full rounded-br-none" @click="toggleTime">
      <p>{{ message.message }}</p>
    </div>
    <p v-if="isShowTime" class="text-end text-[9pt] text-gray-600 mt-1">10:00 PM</p>
  </div>
  <div v-else class="max-w-1/2 mr-auto">
    <div class="flex px-7 py-4 bg-cyan-200  rounded-full rounded-bl-none" @click="toggleTime">
      <p>{{ message.message }}</p>
    </div>
    <p v-if="isShowTime" class="text-[9pt] text-gray-600 mt-1">10:00 PM</p>
  </div>
</template>

<style scoped>

</style>