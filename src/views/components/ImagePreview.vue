<script lang="ts">
import { defineComponent } from 'vue'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default defineComponent({
  name: 'ImagePreview',
  components: { DialogContent, DialogTrigger, Dialog },
  props: {
    imageId: {
      type: String,
      required: true
    },
    classProps: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const host = import.meta.env.VITE_API
    const imageSrc = host + '/attachments/' + props.imageId

    return {
      imageSrc
    }
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <img :alt="imageSrc" :class="classProps" :src="imageSrc" />
    </DialogTrigger>
    <DialogContent class="max-w-screen-2xl max-h-[90%] overflow-hidden">
      <img
        :alt="imageSrc"
        :src="imageSrc"
        class="p-5 h-full w-full object-cover overflow-hidden"
      />
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
