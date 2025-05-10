import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { User, userFieldMap, UserRole, UserRoleEnum } from '../data/schema'
import { DataTableRowActions } from './row-actions'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { IconCash, IconShield } from '@tabler/icons-react'
import { format } from 'date-fns'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={userFieldMap.username} />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('username')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'enabled',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={userFieldMap.enabled} />
    ),
    cell: ({ row }) => {
      const { enabled } = row.original
      const badgeColor = enabled ? 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300' : 'bg-neutral-300/40 border-neutral-300'
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {enabled ? '启用' : '停用'}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={userFieldMap.role} />
    ),
    cell: ({ row }) => {
      const role = row.getValue('role')
      switch (role) {
        case UserRoleEnum.Enum.ADMIN:
          return <div className='flex items-center gap-x-2'>
           <IconShield size={16} className='text-muted-foreground' />
          <span className='text-sm capitalize'>{UserRole.shape[role].value}</span>
        </div>
        default:
          return <div className='flex items-center gap-x-2'>
          <IconCash size={16} className='text-muted-foreground' />
         <span className='text-sm capitalize'>{UserRole.shape[role as keyof typeof UserRole.shape].value}</span>
       </div>
      }
    },
  },
  {
    accessorKey: 'proxy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={userFieldMap.proxy} />
    ),
    cell: ({ row }) => {
      const {proxy} = row.original
      return <div className='flex items-center gap-x-2'>
        <span className='text-sm capitalize'>{proxy.proxyHost}:{proxy.proxyPort}</span>
      </div>
    },
  },
  {
    accessorKey: 'lastLoginAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={userFieldMap.lastLoginAt} />
    ),
    cell: ({ row }) => {
      const {lastLoginAt} = row.original
      return <div className='flex items-center gap-x-2'>
        <span className='text-sm capitalize'>{lastLoginAt ? format(lastLoginAt, 'yyyy-MM-dd HH:mm:ss') : '--'}</span>
      </div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={userFieldMap.createdAt} />
    ),
    cell: ({ row }) => {
      const {createdAt} = row.original
      return <div className='flex items-center gap-x-2'>
        <span className='text-sm capitalize'>{format(createdAt, 'yyyy-MM-dd HH:mm:ss')}</span>
      </div>
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
