import { FriendCollectTaskCreateDialog } from './create-dialog'
import {FriendCollectTask} from "@/features/task/friend-collect/data/schema.ts";
import {DataTableDialogType} from "@/features/task/friend-collect";
import {useDataTableContext} from "@/components/data-table/use-data-table-context.tsx";

// 好友采集任务列表对话框组件实现
export function FriendCollectDialogs() {
  const { open } = useDataTableContext<FriendCollectTask,DataTableDialogType>()
  return (
    <>
      {open === 'create' && <FriendCollectTaskCreateDialog />}
    </>
  )
} 