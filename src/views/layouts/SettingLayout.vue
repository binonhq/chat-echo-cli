<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'SettingLayout',
  components: { Icon, Checkbox, Separator },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const path = computed(() => route.path.split('/')[2])

    const links: any[] = [
      {
        title: 'General',
        icon: 'lucide:audio-waveform',
        link: '/general',
        path: 'general'
      },
      {
        title: 'Personal Information',
        icon: 'lucide:inbox',
        link: '/personal-information',
        path: 'personal-information'
      },
      {
        title: 'Security',
        icon: 'lucide:globe',
        link: '/security',
        path: 'security'
      }
    ]

    const handleClick = (link: string) => {
      router.push('/setting' + link)
    }

    return {
      handleClick,
      links,
      path
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-20 max-h-screen px-48 pt-10 overflow-scroll">
    <h1 class="text-4xl font-semibold">Settings</h1>
    <div class="flex gap-20">
      <nav
        class="sticky mr-10 h-full flex flex-col font-medium gap-5 text-muted-foreground"
      >
        <div v-for="link of links" class="flex items-center">
          <Icon
            :class="path === link.path ? 'opacity-100' : 'opacity-0'"
            class="size-10 text-black duration-200"
            icon="lucide:dot"
          />
          <div
            :class="[
              'p-0 flex items-center w-full transition-all ease-out duration-200 hover:translate-x-2 hover:text-black cursor-pointer',
              { 'text-black translate-x-2': path === link.path }
            ]"
            @click="handleClick(link.link)"
          >
            <div :class="['duration-200 overflow-hidden']">
              {{ link.title }}
            </div>
          </div>
        </div>
      </nav>
      <Separator class="h-full w-[1px]" />
      <RouterView class="grow bg-white" />
    </div>
  </div>
</template>
