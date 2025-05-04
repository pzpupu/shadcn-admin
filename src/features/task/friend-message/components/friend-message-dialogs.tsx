import { useDataTableContext } from '@/components/data-table/data-table-context'
import { FriendMessageTaskCreateDialog } from './friend-message-task-create-dialog'

// 好友私信任务列表对话框组件实现
export function FriendMessageDialogs() {
  const { open } = useDataTableContext()
  return (
    <>
      {open === 'create' && <FriendMessageTaskCreateDialog />}
    </>
  )
}
