import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAccountGroupsContext } from '../context/account-groups-context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountGroupService } from '@/services/account-group-service'
import { toast } from 'sonner'
import { Result } from '@/types/result'
import { AxiosError } from 'axios'

export function AccountGroupsDeleteDialog() {
  const { open, setOpen, currentGroup } = useAccountGroupsContext()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => accountGroupService.deleteById(id),
    onSuccess: () => {
      toast.success('账号组删除成功')
      queryClient.invalidateQueries({ queryKey: [accountGroupService.path] })
    },
    onError: (error: AxiosError<Result<any>>) => {
      toast.error('删除账号组失败', {
        description: error.response?.data.message
      })
    },
  })

  // 确认删除
  const onConfirm = async () => {
    if (currentGroup) {
      deleteMutation.mutate(currentGroup.id, {
        onSuccess: () => {
          setOpen(null)
        }
      })
    }
  }

  // 取消删除
  const onCancel = () => {
    setOpen(null)
  }

  // 如果没有选中的账号组，则不显示对话框
  if (!currentGroup) return null

  return (
    <AlertDialog open={open === 'delete'} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除</AlertDialogTitle>
          <AlertDialogDescription>
            您确定要删除账号组 <span className="font-bold">{currentGroup.name}</span> 吗？
            <br />
            删除该组将同时删除与该组关联的数据(账号、任务等)。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={deleteMutation.isPending}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
          >
            {deleteMutation.isPending ? '删除中...' : '删除'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 