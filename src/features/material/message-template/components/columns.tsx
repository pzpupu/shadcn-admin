import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from './row-actions'
import { MessageTemplate, messageTemplateFieldMap, MessageTemplateTypeEnum, messageTemplateTypeSchema } from '../data/schema'
import { Badge } from '@/components/ui/badge'

// 私信模板列表表格列定义
export const columns: ColumnDef<MessageTemplate>[] = [
  // 选择列
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='全选'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='选择行'
      />
    ),
  },
  // ID列
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title={messageTemplateFieldMap.id} />,
    cell: ({ row }) => <div>{row.getValue('id')}</div>
  },
  // 模板名称列
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title={messageTemplateFieldMap.name} />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>
  },
  // 模板内容列
  {
    accessorKey: 'contents',
    header: ({ column }) => <DataTableColumnHeader column={column} title={messageTemplateFieldMap.contents} />,
    cell: ({ row }) => {
      const contents = row.getValue('contents') as string[]
      return (
        <div className="max-w-[300px] truncate">
          {contents.length > 0 ? contents[0] : ''}
          {contents.length > 1 && <span className="text-muted-foreground"> +{contents.length - 1}条</span>}
        </div>
      )
    }
  },
  // 模板类型列
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title={messageTemplateFieldMap.type} />,
    cell: ({ row }) => {
      const type = row.getValue('type') as MessageTemplateTypeEnum
      const typeValue = messageTemplateTypeSchema.shape[type as keyof typeof messageTemplateTypeSchema.shape]
      
      return (
        <Badge variant="outline">{typeValue.value}</Badge>
      )
    }
  },
  // 创建时间列
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={messageTemplateFieldMap.createdAt} />,
    cell: ({ row }) => format(row.getValue('createdAt'), 'yyyy-MM-dd HH:mm:ss'),
  },
  // 更新时间列
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={messageTemplateFieldMap.updatedAt} />,
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt')
      return updatedAt ? format(updatedAt as Date, 'yyyy-MM-dd HH:mm:ss') : '--'
    },
  },
  // 操作列
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title='操作' />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]