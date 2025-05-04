import FollowerCollectPage from '@/features/task/friend-collect'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/task/friend-collect/')({
  component: FollowerCollectPage,
})
