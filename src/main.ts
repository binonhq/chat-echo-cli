import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.ts'
import store from './store/store.ts'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('Button', Button)
app.component('Label', Label)
app.component('Separator', Separator)
app.component('Input', Input)

app.mount('#app')


