import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { IconCircleDashedLetterI, IconCircleDotted, IconCircleDottedLetterI, IconClockCancel, IconClockOff, IconClockPause, IconClockPlay, IconClockQuestion, IconClockStop, IconProgress } from '@tabler/icons-react'
import { TaskStatusEnum, taskStatusSchema } from '@/types/task-status'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { FriendMessageLog, friendMessageLogFieldMap } from '../data/schema'

// 好友私信任务列表表格列定义
export const columns: ColumnDef<FriendMessageLog>[] = [
  // ID列
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.id} />,
    cell: ({ row }) => <div>{row.getValue('id')}</div>
  },
  // 任务名称列
  {
    accessorKey: 'task',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.task} />,
    cell: ({ row }) => {
      const task = row.original.task
      return <div>{task?.name || '--'}</div>;
    }
  },
  // 账号列
  {
    accessorKey: 'account',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.account} />,
    cell: ({ row }) => {
      const account = row.original.account
      return <div>{account?.nickname || '--'}</div>;
    }
  },
  // 好友列
  {
    accessorKey: 'friend',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.friend} />,
    cell: ({ row }) => {
      const friend = row.original.friend
      return <div>{friend?.nickname || '--'}</div>;
    }
  },
  // 状态列
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.status} />,
    cell: ({ row }) => {
      const status = row.original.status
      return <div>{status}</div>;
    }
  },
  // 错误列
  {
    accessorKey: 'error',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.error} />,
    cell: ({ row }) => <div>{row.getValue('error')}</div>
  },
  // 序号列
  {
    accessorKey: 'sequence',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.sequence} />,
    cell: ({ row }) => <div>{row.getValue('sequence')}</div>
  },
  // 代理列
  {
    accessorKey: 'proxy',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.proxy} />,
    cell: ({ row }) => <div>{row.getValue('proxy')}</div>
  },
  // 重试次数列
  {
    accessorKey: 'retryCount',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.retryCount} />,
    cell: ({ row }) => <div>{row.getValue('retryCount')}</div>
  },
  // 创建时间列
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.createdAt} />,
    cell: ({ row }) => <div>{row.getValue('createdAt')}</div>
  }
] 
