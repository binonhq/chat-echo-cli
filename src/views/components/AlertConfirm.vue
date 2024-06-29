<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const props = defineProps({
  action: {
    type: Function
  },
  type: {
    type: String
  }
})
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button v-if="type === 'add'" type="button">Create</Button>
      <Button v-if="type === 'update'" type="button">Update</Button>
      <Button v-if="type === 'remove'" type="button" variant="destructive"
        >Remove
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          <h2 v-if="type === 'remove'">
            This action cannot be undone. This will permanently remove your data
            from our servers.
          </h2>
          <h2 v-if="type === 'add'">
            This action cannot be undone. This will permanently add your data
            from our servers.
          </h2>
          <h2 v-if="type === 'update'">
            This action cannot be undone. This will permanently update your data
            from our servers.
          </h2>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          :class="type === 'remove' ? 'bg-red-500 hover:bg-red-700' : ''"
          @click="action"
        >
          <h2 v-if="type === 'remove'">Remove</h2>
          <h2 v-if="type === 'update'">Update</h2>
          <h2 v-if="type === 'add'">Create</h2>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped></style>
