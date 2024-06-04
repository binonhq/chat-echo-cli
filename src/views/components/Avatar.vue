<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Avatar',
  props: {
    image: {
      type: String,
      default: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
    },
    online: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  setup(props) {
    const sizeAvatar = computed(() => {
      switch (props.size) {
        case 'xs':
          return {
            avatar: 'h-12 w-12',
            online: 'h-2 w-2',
            onlineSpace: 'bottom-[1px] right-[6px]'
          }
        case 'default':
          return {
            avatar: 'h-32 w-32',
            online: 'h-4 w-4',
            onlineSpace: 'bottom-[7px] right-[16px]'
          }
        case 'sm':
          return {
            avatar: 'h-16 w-16',
            online: 'h-3 w-3',
            onlineSpace: 'bottom-[2px] right-[5px]'
          }
        case 'md':
          return {
            avatar: 'h-40 w-40',
            online: 'h-5 w-5',
            onlineSpace: 'bottom-[6px] right-[6px]'
          }
        default:
          return {
            avatar: 'h-32 w-32',
            online: 'h-4 w-4',
            onlineSpace: 'bottom-[4px] right-[4px]'
          }
      }
    })
    return {
      sizeAvatar
    }
  }
})
</script>

<template>
  <div :class="['relative', sizeAvatar.avatar]">
    <img
      :src="image"
      alt="avatar"
      class="rounded-full">
    <div v-if="online"
         :class="['absolute rounded-full bg-yellow-300', sizeAvatar.online, sizeAvatar.onlineSpace]"></div>
  </div>
</template>

<style scoped>

</style>