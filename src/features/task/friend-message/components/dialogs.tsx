import { FriendMessageTaskCreateDialog } from './create-dialog'
import {useDataTableContext} from "@/components/data-table/use-data-table-context.tsx";

// 好友私信任务列表对话框组件实现
export function FriendMessageDialogs() {
  const { open } = useDataTableContext()
  return (
    <>
      {open === 'create' && <FriendMessageTaskCreateDialog />}
    </>
  )
}
