import { RefreshCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { DataTableToolbarProps } from '@/components/data-table'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { httpMessageTaskService } from '@/services/http-message-service'
import { FriendMessageLog, friendMessageLogFieldMap } from '../data/schema'


export function DataTableToolbar<TData extends FriendMessageLog>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        
      </div>
      <div className="flex items-center gap-2">
        {/* 列显示选项 */}
        <DataTableViewOptions table={table} fieldMap={friendMessageLogFieldMap as Record<keyof TData, string>} />
        {/* 刷新 */}
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => {
            setIsRefreshing(true)
            queryClient.invalidateQueries({ queryKey: [httpMessageTaskService.path] })
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