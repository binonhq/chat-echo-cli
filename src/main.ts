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
import Logo from './views/components/Logo.vue'
import axios from 'axios'

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

// axios.defaults.baseURL = import.meta.env.VITE_ROOT_API
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = false

app.mount('#app')


