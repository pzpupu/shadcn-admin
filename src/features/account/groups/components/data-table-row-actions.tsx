import { Row } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, RefreshCcw, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AccountGroup } from '../data/schema'
import { useAccountGroupsContext } from '../context/account-groups-context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountGroupService } from '@/services/account-group-service'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { Result } from '@/types/result'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends AccountGroup>({
  row,
}: DataTableRowActionsProps<TData>) {
  const accountGroup = row.original
  const { setOpen, setCurrentGroup } = useAccountGroupsContext()

  const queryClient = useQueryClient()

  const { mutate: refreshGroup, isPending: isRefreshing } = useMutation({
    mutationFn: () => accountGroupService.refreshAccountGroup(accountGroup.id),
    onSuccess: () => {
      toast.success(`账号组刷新成功`, { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: [accountGroupService.path] })
    },
    onError: (error: AxiosError<Result<unknown>>) => {
      // eslint-disable-next-line no-console
      console.error('刷新账号组失败', error)
      toast.error(`${error.response?.data?.message || error.message}`, { duration: 5000, description: error.response?.data?.desc })
    }
  })

  // 编辑账号组
  const onEdit = () => {
    setCurrentGroup(accountGroup)
    setOpen('edit')
  }

  // 删除账号组
  const onDelete = () => {
    setCurrentGroup(accountGroup)
    setOpen('delete')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">打开菜单</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => refreshGroup()} disabled={isRefreshing}>
          <RefreshCcw className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
          {isRefreshing ? '刷新中...' : '刷新'}
          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>编辑</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          <span>删除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 