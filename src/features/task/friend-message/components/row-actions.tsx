import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logs, MoreHorizontal, StopCircle } from 'lucide-react'
import { messageTemplateService } from '@/services/message-template-service'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { HttpMessageTask } from '../data/schema'
import { Link } from '@tanstack/react-router'

interface DataTableRowActionsProps {
  row: Row<HttpMessageTask>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const record = row.original
  const queryClient = useQueryClient()

  // 停止任务操作
  const handleStop = async () => {
    try {
      await messageTemplateService.stopTask(String(record.id))
      toast.success('停止任务成功')
      queryClient.invalidateQueries({ queryKey: [messageTemplateService.path] })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('停止任务失败:', error)
      toast.error('停止任务失败')
    }
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
        <DropdownMenuLabel>操作</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Logs className="mr-2 h-4 w-4" />
          <Link to={`/task/friend-message/$taskId/logs`} params={{ taskId: row.original.id }}>
            <span >任务日志</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleStop}>
          <StopCircle className="mr-2 h-4 w-4" />
          <span>停止任务</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 