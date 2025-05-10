import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { AccountGroup, accountGroupFieldMap } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { regions } from '@/types/region'

// 表格列定义
export const columns: ColumnDef<AccountGroup>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.name} />,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.description} />,
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue('description')}
      </div>
    ),
  },

  {
    accessorKey: 'accountCount',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.accountCount} />,
    cell: ({ row }) => <div className="text-center">{row.getValue('accountCount')}</div>,
  },
  {
    accessorKey: 'region',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.region} />,
    cell: ({ row }) => {
      const region = row.getValue('region')
      if (region) {
        return (
          <Badge className="text-center">
            { `${region}|${regions[region as keyof typeof regions]}` }
          </Badge>
        )
      }
      return '-'
    },
  },
  {
    accessorKey: 'totalFollowing',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.totalFollowing} />,
    cell: ({ row }) => <div className="text-center">{row.getValue('totalFollowing')}</div>,
  },
  {
    accessorKey: 'totalFollowers',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.totalFollowers} />,
    cell: ({ row }) => <div className="text-center">{row.getValue('totalFollowers')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.createdAt} />,
    cell: ({ row }) => format(row.getValue('createdAt'), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title={accountGroupFieldMap.updatedAt} />,
    cell: ({ row }) => {
      const updatedAt: Date | undefined = row.getValue('updatedAt')
      if (updatedAt) {
        return format(updatedAt, 'yyyy-MM-dd HH:mm:ss')
      }
      return '-'
    },
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title="操作" />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] 