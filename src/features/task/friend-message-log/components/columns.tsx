import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { FriendMessageLog, friendMessageLogFieldMap } from '../data/schema'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

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
    cell: ({ row }) => {
      const error = row.getValue('error') as string;
      if (!error) return <div>--</div>;
      
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="xs">查看错误</Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-md">
            <pre className="text-xs whitespace-pre-wrap">{error}</pre>
          </PopoverContent>
        </Popover>
      );
    }
  },
  // 序号列
  {
    accessorKey: 'sequence',
    header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.sequence} />,
    cell: ({ row }) => <div>{row.getValue('sequence')}</div>
  },
  // 代理列
  // {
  //   accessorKey: 'proxy',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title={friendMessageLogFieldMap.proxy} />,
  //   cell: ({ row }) => <div>{row.getValue('proxy')}</div>
  // },
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
