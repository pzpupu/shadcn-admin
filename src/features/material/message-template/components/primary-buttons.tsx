import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDataTableContext } from '@/components/data-table/data-table-context'

// 私信模板列表主操作按钮组件实现
export function MessageTemplatePrimaryButtons() {
  const { setOpen } = useDataTableContext()

  return (
    <div className='flex items-center gap-2'>
      <Button 
        variant='default' 
        size='sm'
        onClick={() => setOpen('create')}
        className='h-8'
      >
        <PlusCircle className='mr-2 h-4 w-4' />
        新建模板
      </Button>
    </div>
  )
}