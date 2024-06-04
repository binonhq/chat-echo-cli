<script lang="ts">
import { defineComponent } from 'vue'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export default defineComponent({
  name: 'CommunityPage',
  components: { Checkbox, Input },
  setup() {
    const fakePeople = [
      {
        name: 'John Doe',
        age: 25,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Doe',
        age: 22,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'John Smith',
        age: 30,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      },
      {
        name: 'Jane Smith',
        age: 28,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      },
      {
        name: 'John Doe',
        age: 25,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Doe',
        age: 22,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'John Smith',
        age: 30,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Smith',
        age: 28,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      },
      {
        name: 'John Doe',
        age: 25,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Doe',
        age: 22,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'John Smith',
        age: 30,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Smith',
        age: 28,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      },
      {
        name: 'John Doe',
        age: 25,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Doe',
        age: 22,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'John Smith',
        age: 30,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Smith',
        age: 28,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      },
      {
        name: 'John Doe',
        age: 25,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://random'
      }, {
        name: 'Jane Doe',
        age: 22,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'John Smith',
        age: 30,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      }, {
        name: 'Jane Smith',
        age: 28,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://randomuser.me/api/portraits'
      },
      {
        name: 'John Doe',
        age: 25,
        describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt',
        avatar: 'https://random'
      }
    ]
    return {
      fakePeople
    }
  }
})
</script>

<template>
  <div class="flex max-h-screen flex-col px-20 py-10">
    <h1 class="text-4xl font-semibold">Community</h1>
    <div class="mt-5 ml-auto flex w-1/2 items-center gap-5">
      <div class="relative flex grow items-center">
        <Input id="search" class="pl-8" placeholder="Search people" type="text" />
        <div class="absolute inset-y-0 flex items-center justify-center px-2 start-0">
          <svg class="size-5 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="1.5"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="(people ,i) in fakePeople" :key="i"
           class="m-5 flex cursor-pointer gap-5 rounded-xl p-5 duration-150 border-[1px] hover:border-primary hover:scale-105">
        <img
          alt="avatar"
          class="h-16 w-16 rounded-full xl:h-20 xl:w-20"
          src="https://minimomonimi.com/cdn/shop/products/simple-avatar-minimomonimi-cartoonish-minimalist-01.png?v=1664979841">
        <div>
          <p class="font-semibold">{{ people.name }}</p>
          <p class="text-sm font-light">{{ people.describe }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>