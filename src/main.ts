import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.ts'
import store from './store/store.ts'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Toggle } from './components/ui/toggle'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Icon } from '@iconify/vue'


import Logo from './views/components/Logo.vue'
import axios from 'axios'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Avatar from '@/views/components/Avatar.vue'
import { getToken } from '@/utils/util.ts'

const app = createApp(App)
app.use(router)
app.use(store)

app.component('Button', Button)
app.component('Label', Label)
app.component('Separator', Separator)
app.component('Input', Input)
app.component('FormField', FormField)
app.component('FormLabel', FormLabel)
app.component('FormControl', FormControl)
app.component('FormMessage', FormMessage)
app.component('FormItem', FormItem)
app.component('Checkbox', Checkbox)
app.component('Logo', Logo)
app.component('Alert', Alert)
app.component('AlertTitle', AlertTitle)
app.component('AlertDescription', AlertDescription)
app.component('Toggle', Toggle)
app.component('ResizablePanelGroup', ResizablePanelGroup)
app.component('ResizablePanel', ResizablePanel)
app.component('ResizableHandle', ResizableHandle)
app.component('Tooltip', Tooltip)
app.component('TooltipContent', TooltipContent)
app.component('TooltipTrigger', TooltipTrigger)
app.component('TooltipProvider', TooltipProvider)
app.component('Icon', Icon)
app.component('Avatar', Avatar)

// axios.defaults.baseURL = import.meta.env.VITE_ROOT_API
// axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = false
axios.defaults.headers.common['Authorization'] = getToken()?.accessToken

export const mainAxios = axios.create({
  baseURL: 'http://localhost:8080'
})

// const voiceAxios = axios.create({
//   baseURL: 'https://some-custom-domain.example/api/'
// })

app.mount('#app')


