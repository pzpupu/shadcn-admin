import { RefreshCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { friendCollectService } from '@/services/froemd-collect-service'
import { DataTableToolbarProps } from '@/components/data-table'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { friendListFieldMap, TiktokFriend } from '../data/schema'


export function DataTableToolbar<TData extends TiktokFriend>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="搜索用户名..."
          value={(table.getColumn('uniqueId')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('uniqueId')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* 清除筛选条件按钮 */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            重置
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* 刷新 */}
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => {
            setIsRefreshing(true)
            queryClient.invalidateQueries({ queryKey: [friendCollectService.path] })
              .finally(() => {
                setIsRefreshing(false)
              })
          }}
          disabled={isRefreshing}
        >
          {isRefreshing ? <RefreshCcw className='h-4 w-4 animate-spin' /> : <RefreshCcw className='h-4 w-4' />}
        </Button>
        {/* 列显示选项 */}
        <DataTableViewOptions<TData> table={table} fieldMap={friendListFieldMap as Record<keyof TData, string>} />
      </div>
    </div>
  )
} 