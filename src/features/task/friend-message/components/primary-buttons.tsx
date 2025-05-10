import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {useDataTableContext} from "@/components/data-table/use-data-table-context.tsx";

// 好友私信任务列表主操作按钮组件实现
export function FriendMessagePrimaryButtons() {
  const { setOpen } = useDataTableContext()

  return (
    <div className='flex items-center gap-2'>
      <Button 
        variant='default' 
        size='sm'
        onClick={() => setOpen('create')}
        className='h-8'
      >
        <Upload className='mr-2 h-4 w-4' />
        创建任务
      </Button>
    </div>
  )
} 