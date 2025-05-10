import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { messageTemplateService } from '@/services/message-template-service'
import { CreateMessageTemplateInput, createMessageTemplateSchema } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {useDataTableContext} from "@/components/data-table/use-data-table-context.tsx";

export function MessageTemplateCreateDialog() {
  const { open, setOpen, setCurrent } = useDataTableContext()
  const queryClient = useQueryClient()
  // 创建mutation hook
  const createMutation = useMutation({
    mutationFn: (data: CreateMessageTemplateInput) => messageTemplateService.create(data),
    onSuccess: () => {
      toast.success('私信模板创建成功', { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: [messageTemplateService.path] })
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('创建私信模板失败:', error)
      toast.error('创建私信模板失败')
    },
  })

  // 表单实例
  const form = useForm<CreateMessageTemplateInput>({
    resolver: zodResolver(createMessageTemplateSchema),
    defaultValues: {
      name: '',
      contents: [''],
      type: 'TEXT',
    },
  })

  // 提交表单
  const onSubmit = () => {
    // 处理换行分割的内容
    const rawContent = form.getValues('contents')[0] || '';
    const contentLines = rawContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (contentLines.length === 0) {
      form.setError('contents', {
        type: 'manual',
        message: '请至少输入一条模板内容'
      });
      return;
    }
    const values = form.getValues();
    const submissionData = {
      ...values,
      contents: contentLines,
    };

    createMutation.mutate(submissionData, {
      onSuccess: () => {
        setOpen(null)
        form.reset()
      }
    })
  }

  // 关闭对话框
  const onClose = () => {
    setCurrent(null)
    setOpen(null)
    form.reset()
  }

  const isLoading = createMutation.isPending

  return (
    <Dialog open={open === 'create'} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>创建私信模板</DialogTitle>
          <DialogDescription>
            创建一个新的私信模板。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 名称字段 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>模板名称</FormLabel>
                  <FormControl>
                    <Input placeholder="输入模板名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 模板内容 */}
            <FormField
              control={form.control}
              name="contents.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>模板内容</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="输入模板内容，每行一条内容"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    请输入多行文本，每行将作为一条独立的模板内容
                  </p>
                  <p className="text-xs text-muted-foreground">
                    可以使用 <Badge variant="outline">{'{emoji}'}</Badge> 占位符, 随机使用表情符号
                  </p>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                取消
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '处理中...' : '创建'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 