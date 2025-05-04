import { createFileRoute } from '@tanstack/react-router'
import FriendMessagePage from '@/features/task/friend-message'
export const Route = createFileRoute('/_authenticated/task/friend-message/')({
  component: FriendMessagePage,
})

