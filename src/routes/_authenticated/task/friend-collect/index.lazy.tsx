import FollowerCollectPage from '@/features/task/friend-collect'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated/task/friend-collect/',
)({
  component: FollowerCollectPage,
})
