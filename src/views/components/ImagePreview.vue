<script lang="ts">
import { defineComponent } from 'vue'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default defineComponent({
  name: 'ImagePreview',
  components: { DialogContent, DialogTrigger, Dialog },
  props: {
    imageId: {
      type: String,
      default: ''
    },
    classProps: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    }
  },
  setup(props) {
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
      <img v-if="src !== ''" :alt="imageSrc" :class="classProps" :src="src" />
      <img v-else :alt="imageSrc" :class="classProps" :src="imageSrc" />
    </DialogTrigger>
    <DialogContent class="max-w-screen-2xl max-h-[90%] overflow-hidden">
      <img
        v-if="src !== ''"
        :alt="imageSrc"
        :src="src"
        class="p-5 h-full w-full object-contain overflow-hidden"
      />
      <img
        v-else
        :alt="imageSrc"
        :src="imageSrc"
        class="p-5 h-full w-full object-contain overflow-hidden"
      />
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
