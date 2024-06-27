<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils.ts'
import { Separator } from '@/components/ui/separator'

export default defineComponent({
  name: 'SideBar',
  components: { Separator },
  methods: { cn, buttonVariants },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { logout } = useAuth()

    const path = computed(() => route.path.split('/')[1])
    const isCollapsed = ref(true)
    const toggleCollapsed = () => {
      isCollapsed.value = !isCollapsed.value
    }
    const isLightMode = ref(true)

    const links: any[] = [
      {
        title: 'Inbox',
        label: '',
        icon: 'lucide:inbox',
        link: '/chat/',
        path: 'chat'
      },
      {
        title: 'Community',
        label: '',
        icon: 'lucide:globe',
        link: '/community',
        path: 'community'
      },
      {
        title: 'Voice setting',
        label: '',
        icon: 'lucide:audio-waveform',
        link: '/voice',
        path: 'voice'
      }
    ]

    const functionButtons = computed(() => [
      {
        title: 'My account',
        icon: 'lucide:user',
        path: 'account',
        function: () => {
          router.push('/account')
        }
      },
      {
        title: 'Setting',
        icon: 'lucide:settings',
        path: 'setting',
        function: () => {
          router.push('/setting/general')
        }
      },
      {
        title: 'Theme',
        icon: isLightMode.value ? 'lucide:moon' : 'lucide:sun',
        function: () => {
          isLightMode.value = !isLightMode.value
        }
      },
      {
        title: 'Log out',
        icon: 'lucide:log-out',
        path: 'logout',
        function: () => {
          logout()
        }
      }
    ])

    const handleClick = (link: string) => {
      router.push(link)
    }

    return {
      isCollapsed,
      path,
      links,
      functionButtons,
      logout,
      toggleCollapsed,
      handleClick
    }
  }
})
</script>

<template>
  <div
    :class="isCollapsed ? 'w-20' : 'w-72'"
    class="h-full flex flex-col items-center transition-all ease-out duration-200 gap-2 px-4 py-5 border-r-[1px]"
  >
    <div class="flex justify-between w-full">
      <Logo
        :class="isCollapsed ? 'opacity-0 h-0 w-0' : 'opacity-100'"
        :show-name="!isCollapsed"
        class="duration-200"
      />
      <Toggle class="size-12" @click="toggleCollapsed">
        <Icon class="size-4 cursor-pointer" icon="lucide:panel-left"></Icon>
      </Toggle>
    </div>
    <Separator class="w-full mb-5" />
    <template v-for="link of links">
      <Button
        :class="[
          'p-0 flex w-full transition-all ease-out duration-200 justify-start gap-3 h-12',
          isCollapsed ? 'w-12' : 'w-64'
        ]"
        :variant="path === link.path ? 'default' : 'ghost'"
        @click="handleClick(link.link)"
      >
        <Icon v-if="!isCollapsed" :icon="link.icon" class="size-4 ml-4" />
        <TooltipProvider v-else delay-duration="0">
          <Tooltip>
            <TooltipTrigger>
              <Icon :icon="link.icon" class="size-4 ml-4" />
            </TooltipTrigger>
            <TooltipContent side="right" side-offset="4">
              <p>{{ link.title }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div
          :class="[
            isCollapsed ? 'h-0 w-0 ' : 'ml-0',
            'duration-200 overflow-hidden'
          ]"
        >
          {{ link.title }}
        </div>
      </Button>
    </template>
    <div class="mt-auto space-y-2">
      <Separator class="w-full mb-7" />
      <Button
        v-for="button of functionButtons"
        :class="[
          'p-0 flex w-full transition-all ease-out duration-200 justify-start gap-3 h-12',
          isCollapsed ? 'w-12' : 'w-64'
        ]"
        :variant="path === button.path ? 'default' : 'ghost'"
        @click="button.function"
      >
        <Icon v-if="!isCollapsed" :icon="button.icon" class="size-4 ml-4" />
        <TooltipProvider v-else :delay-duration="0">
          <Tooltip>
            <TooltipTrigger>
              <Icon :icon="button.icon" class="size-4 ml-4" />
            </TooltipTrigger>
            <TooltipContent :side="'right'" side-offset="4">
              <p>{{ button.title }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div
          :class="[
            isCollapsed ? 'h-0 w-0 ' : 'ml-0',
            'duration-200 overflow-hidden'
          ]"
        >
          {{ button.title }}
        </div>
      </Button>
    </div>
  </div>
</template>
