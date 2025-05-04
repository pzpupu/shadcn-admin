import MessageTemplatePage from '@/features/material/message-template'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_authenticated/material/message-template/',
)({
  component: MessageTemplatePage,
})
