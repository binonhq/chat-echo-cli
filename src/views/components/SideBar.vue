<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils.ts'
import Logo from '@/views/components/Logo.vue'

export default defineComponent({
  name: 'SideBar',
  components: { Logo },
  methods: { cn, buttonVariants },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { logout } = useAuth()
    const path = computed(() => route.path.split('/')[1])
    const links: any[] = [
      {
        title: 'Inbox',
        label: '',
        icon: 'lucide:inbox',
        link: '/chat/1',
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
        title: 'Log out',
        label: '',
        icon: 'lucide:log-out',
        link: '/logout',
        path: 'logout'
      }
    ]

    const handleClick = (link: string) => {
      if (link === '/logout') {
        logout()
        return
      }
      router.push(link)
    }

    return {
      path,
      logout,
      links,
      handleClick
    }
  }
})
</script>

<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 py-5 h-full"
  >
    <div
      class="h-full flex flex-col gap-2 group-[[data-collapsed=true]]:items-center px-3 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <Logo :class="['mb-5', {'mx-auto' : !isCollapsed}]" :show-name="!isCollapsed" />
      <template v-for="(link, index) of links">
        <a v-if="isCollapsed" :class="cn(
                buttonVariants({ variant: path === link.path ? 'default' : 'ghost', size: 'icon' }),
                'h-9 w-9',
                index === links.length-1 && 'mt-auto',
                link.variant === 'default'
                  && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )"
           href="#"
           @click="handleClick(link.link)"
        >
          <Icon :icon="link.icon" class="size-4" />
          <span class="sr-only">{{ link.title }}</span>
        </a>
        <a
          v-else
          :key="`2-${index}`"
          :class="cn(
            buttonVariants({ variant: path === link.path ? 'default' : 'ghost', size: 'sm' }),
            index === links.length -1 && 'mt-auto',
            link.variant === 'default'
              && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
            'justify-start',
          )"
          href="#"
          @click="handleClick(link.link)"
        >
          <Icon :icon="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span
            v-if="link.label"
            :class="cn(
              'ml-auto',
              link.variant === 'default'
                && 'text-background dark:text-white',
            )"
          >
            {{ link.label }}
          </span>
        </a>
      </template>
    </div>
  </div>
</template>
