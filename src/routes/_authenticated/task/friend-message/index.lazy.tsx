import { createLazyFileRoute } from '@tanstack/react-router'
import FriendMessagePage from '@/features/task/friend-message'

export const Route = createLazyFileRoute(
  '/_authenticated/task/friend-message/',
)({
  component: FriendMessagePage,
})
