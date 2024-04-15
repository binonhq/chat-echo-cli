<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FriendsOnline',
  setup() {
    const friendsFakeData = [
      {
        id: 1,
        name: 'John Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      },
      {
        id: 3,
        name: 'John Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      },
      {
        id: 4,
        name: 'Jane Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      },
      {
        id: 5,
        name: 'John Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      },
      {
        id: 6,
        name: 'Jane Doe',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      },
      {
        id: 7,
        name: 'John Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      },
      {
        id: 8,
        name: 'Jane Smith',
        avatar: 'https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841'
      }
    ]
    return {
      friendsFakeData
    }
  }
})
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="flex justify-between font-semibold">
      <h2>Friends Online</h2>
      <h2>23</h2>
    </div>
    <div class="flex gap-4 py-5 w-full overflow-x-scroll h-full">
      <div v-for="friend in friendsFakeData" :key="friend.id">
        <div class="w-14 h-14">
          <img :src="friend.avatar" alt="avatar" class="rounded-full" />
        </div>
        <span class="text-[8pt] truncate overflow-hidden">{{ friend.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>