import FriendMessageLogPage from '@/features/task/friend-message-log'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/task/friend-message/$taskId/logs',
)({
  component: FriendMessageLogPage,
})
