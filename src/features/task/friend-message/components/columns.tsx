import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { HttpMessageTask, httpMessageTaskFieldMap } from '../data/schema'
import { IconCircleDashedLetterI, IconCircleDotted, IconCircleDottedLetterI, IconClockCancel, IconClockOff, IconClockPause, IconClockPlay, IconClockQuestion, IconClockStop, IconProgress } from '@tabler/icons-react'
import { TaskStatusEnum, taskStatusSchema } from '@/types/task-status'

// 好友私信任务列表表格列定义
export const columns: ColumnDef<HttpMessageTask>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.id} />,
    cell: ({ row }) => <div>{row.getValue('id')}</div>
  },
  // 任务名称列
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.name} />,
    cell: ({ row }) => <div>{row.getValue('name')}</div>
  },
  // 任务描述列
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.description} />,
    cell: ({ row }) => <div>{row.getValue('description')}</div>
  },
  // 分组列
  {
    accessorKey: 'group',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.group} />,
    cell: ({ row }) => {
      const group = row.original.group
      return <div>{group ? group.name : '--'}</div>
    },
  },
  // 总数列
  {
    accessorKey: 'total',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.total} />,
    cell: ({ row }) => <div>{row.getValue('total')}</div>
  },
  // 成功数列
  {
    accessorKey: 'success',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.success} />,
    cell: ({ row }) => <div>{row.getValue('success')}</div>
  },
  // 失败数列
  {
    accessorKey: 'failed',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.failed} />,
    cell: ({ row }) => <div>{row.getValue('failed')}</div>
  },
  // 任务状态列
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.status} />,
    cell: ({ row }) => {
      const status = row.original.status
      const statusValue = taskStatusSchema.shape[status as TaskStatusEnum]
      let icon = null
      switch (status) {
        case 'CREATED':
          icon = <IconCircleDotted  className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'INITIALIZING':
          icon = <IconCircleDottedLetterI className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'INITIALIZED':
          icon = <IconCircleDashedLetterI className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'PROCESSING':
          icon = <IconProgress className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'COMPLETED':
          icon = <IconClockCancel className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'FAILED':
          icon = <IconClockOff className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'STOPPED':
          icon = <IconClockStop className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'PAUSED':
          icon = <IconClockPause className='text-muted-foreground mr-2 h-4 w-4' />
          break
        case 'RESUMED':
          icon = <IconClockPlay className='text-muted-foreground mr-2 h-4 w-4' />
          break
        default:
          icon = <IconClockQuestion className='text-muted-foreground mr-2 h-4 w-4' />
          break
      }

      return (
        <div className='flex items-center'>
          {icon}
          <span>{statusValue.value}</span>
        </div>
      )
    }
  },
  // 创建时间列
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.createdAt} />,
    cell: ({ row }) => format(row.getValue('createdAt'), 'yyyy-MM-dd HH:mm:ss'),
  },
  // 更新时间列
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={httpMessageTaskFieldMap.updatedAt} />,
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt')
      return <div className='text-center'>{updatedAt ? format(updatedAt as Date, 'yyyy-MM-dd HH:mm:ss') : '--'}</div>
    },
  },
] 