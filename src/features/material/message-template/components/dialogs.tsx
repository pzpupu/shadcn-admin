import { useDataTableContext } from '@/components/data-table/data-table-context'
import { MessageTemplateCreateDialog } from './create-dialog'
import { MessageTemplateEditDialog } from './edit-dialog'

// 私信模板对话框组件实现
export function MessageTemplateDialogs() {
  const { open } = useDataTableContext()
  return (
    <>
      {open === 'create' && <MessageTemplateCreateDialog />}
      {open === 'edit' && <MessageTemplateEditDialog />}
    </>
  )
}