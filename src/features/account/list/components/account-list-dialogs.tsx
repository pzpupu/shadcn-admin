import { AccountListDeleteDialog } from './account-list-delete-dialog'
import { AccountListImportDialog } from './account-list-import-dialog'
import { useAccountListContext } from '../context/account-list-context'
import { AccountListUpdateDialog } from './account-list-update-dialog'

// 账号列表对话框组件实现
export function AccountListDialogs() {
  const { open } = useAccountListContext()
  return (
    <>
      {open === 'delete' && <AccountListDeleteDialog />}
      {open === 'import' && <AccountListImportDialog />}
      {open === 'update' && <AccountListUpdateDialog />}
    </>
  )
} 