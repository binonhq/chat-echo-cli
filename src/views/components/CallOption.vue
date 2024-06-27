<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '@/components/ui/button'
import { useChatting } from '@/composables/useChatting/useChatting.ts'

export default defineComponent({
  name: 'CallOption',
  components: { Button },
  setup() {
    const { currentChannelId, makeNewCall } = useChatting()

    const handleCall = (option: string) => {
      makeNewCall(currentChannelId.value, option)
    }

    return {
      handleCall
    }
  }
})
</script>

<template>
  <div class="flex gap-3">
    <Button size="icon" variant="ghost" @click="handleCall('audio')">
      <Icon class="size-5 text-primary cursor-pointer" icon="lucide:phone" />
    </Button>
    <Button size="icon" variant="ghost" @click="handleCall('video')">
      <Icon class="size-5 text-primary cursor-pointer" icon="lucide:video" />
    </Button>
  </div>
</template>

<style scoped></style>
