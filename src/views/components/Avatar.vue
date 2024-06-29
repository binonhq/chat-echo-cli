<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useChatting } from '@/composables/useChatting/useChatting.ts'
import { ChannelType } from '@/types/types.ts'
import ImagePreview from '@/views/components/ImagePreview.vue'

export default defineComponent({
  name: 'Avatar',
  components: { ImagePreview },
  props: {
    imageId: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    userId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    canPreview: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const { onlineUsers } = useChatting()
    const sizeAvatar = computed(() => {
      switch (props.size) {
        case 'xxs':
          return {
            avatar: 'h-12 w-12',
            online: 'h-2 w-2',
            onlineSpace: 'bottom-[1px] right-[6px]'
          }
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
        case 'xl':
          return {
            avatar: 'h-48 w-48',
            online: 'h-6 w-6',
            onlineSpace: 'bottom-[8px] right-[8px]'
          }
        default:
          return {
            avatar: 'h-32 w-32',
            online: 'h-4 w-4',
            onlineSpace: 'bottom-[4px] right-[4px]'
          }
      }
    })

    const avatarSrc = computed(() => {
      if (props.imageId) {
        const host = import.meta.env.VITE_API
        return `${host}/images/${props.imageId}`
      }
      return props.type === ChannelType.GROUP
        ? 'https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-group-avatar-icon-design-vector-png-image_5268097.png'
        : 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
    })

    const online = computed(() => {
      const onlineUserIds = onlineUsers.value.map((user) => user.userId)
      return onlineUserIds.includes(props.userId)
    })

    return {
      sizeAvatar,
      avatarSrc,
      online
    }
  }
})
</script>

<template>
  <div :class="sizeAvatar.avatar" class="relative">
    <ImagePreview
      v-if="imageId && canPreview"
      :src="avatarSrc"
      class-props="rounded-full w-full h-full object-cover bg-gray-200"
    />
    <img
      v-else
      :src="avatarSrc"
      alt="avatar"
      class="rounded-full w-full h-full object-cover bg-gray-200"
    />
    <div
      v-if="online"
      :class="[
        'absolute rounded-full bg-yellow-300',
        sizeAvatar.online,
        sizeAvatar.onlineSpace
      ]"
    ></div>
  </div>
</template>

<style scoped></style>
