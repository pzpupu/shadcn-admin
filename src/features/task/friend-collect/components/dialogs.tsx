import { useDataTableContext } from '@/components/data-table/data-table-context'
import { FriendCollectTaskCreateDialog } from './create-dialog'

// 好友采集任务列表对话框组件实现
export function FriendCollectDialogs() {
  const { open } = useDataTableContext()
  return (
    <>
      {open === 'create' && <FriendCollectTaskCreateDialog />}
    </>
  )
} 