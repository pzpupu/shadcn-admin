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
import { MessageTemplate } from '../data/schema'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { messageTemplateService } from '@/services/message-template-service'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import {useDataTableContext} from "@/components/data-table/use-data-table-context.tsx";

interface DataTableRowActionsProps {
  row: Row<MessageTemplate>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const record = row.original
  const { setOpen, setCurrent } = useDataTableContext()
  const queryClient = useQueryClient()

  // 编辑操作
  const handleEdit = () => {
    setCurrent(record)
    setOpen('edit')
  }

  // 删除操作
  const handleDelete = async () => {
    try {
      await messageTemplateService.deleteById(String(record.id))
      toast.success('删除成功')
      queryClient.invalidateQueries({ queryKey: [messageTemplateService.path] })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('删除失败:', error)
      toast.error('删除失败')
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
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>编辑</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          <span>删除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 