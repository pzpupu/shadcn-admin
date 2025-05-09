import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableToolbarProps } from '@/components/data-table'
import { userFieldMap, UserRole } from '../data/schema'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { userService } from '@/services/user-service'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'

export function Toolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='搜索用户...'
          value={
            (table.getColumn('username')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('username')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='角色'
              options={Object.entries(UserRole.shape).map(([key, value]) => ({
                label: value.value,
                value: key,
              }))}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* 列显示选项 */}
        <DataTableViewOptions table={table} fieldMap={userFieldMap as Record<keyof TData, string>} />
        {/* 刷新 */}
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => {
            setIsRefreshing(true)
            queryClient.invalidateQueries({ queryKey: [userService.path] })
              .finally(() => {
                setIsRefreshing(false)
              })
          }}
          disabled={isRefreshing}
        >
          {isRefreshing ? <RefreshCcw className='h-4 w-4 animate-spin' /> : <RefreshCcw className='h-4 w-4' />}
        </Button>
      </div>
    </div>
  )
}
