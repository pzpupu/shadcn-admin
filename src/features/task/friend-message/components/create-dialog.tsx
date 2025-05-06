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
import { Textarea } from '@/components/ui/textarea'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useDataTableContext } from '@/components/data-table/data-table-context'
import { httpMessageTaskService } from '@/services/http-message-service'
import { CreateHttpMessageTaskInput, createHttpMessageTaskSchema, messageSendModeEnum, messageSendModeSchema } from '../data/schema'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import { accountGroupService } from '@/services/account-group-service'
import { Check, ChevronsUpDown } from 'lucide-react'
import { PopoverContent } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useState } from 'react'
import { messageTemplateService } from '@/services/message-template-service'
import MultipleRegionSelect from '@/components/select/multiple-region-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function FriendMessageTaskCreateDialog() {
  const { open, setOpen } = useDataTableContext()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [templateSearchTerm, setTemplateSearchTerm] = useState<string>('')

  const queryClient = useQueryClient()

  // 创建和更新的mutation hooks
  const createMutation = useMutation({
    mutationFn: (data: CreateHttpMessageTaskInput) => httpMessageTaskService.create(data),
    onSuccess: () => {
      toast.success('好友私信任务创建成功', { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: [httpMessageTaskService.path] })
    },
    onError: (error) => {
      console.error('创建好友私信任务失败:', error)
      toast.error('创建好友私信任务失败')
    },
  })

  // 表单实例
  const form = useForm<CreateHttpMessageTaskInput>({
    resolver: zodResolver(createHttpMessageTaskSchema),
    defaultValues: {
      name: '',
      description: undefined,
      groupId: undefined,
      templateId: undefined,
      interval: 5,
      regions: [],
      sendMode: messageSendModeEnum.Enum.SEND_TO_FRIENDS_WITHOUT_MESSAGE,
    },
  })

  const { data: groupOptions } = useQuery({
    queryKey: [`${accountGroupService.path}/options`, searchTerm],
    queryFn: () => accountGroupService.getOptions(searchTerm),
    placeholderData: keepPreviousData,
  })

  const { data: templateOptions } = useQuery({
    queryKey: [`${messageTemplateService.path}/options`, templateSearchTerm],
    queryFn: () => messageTemplateService.getOptions(templateSearchTerm),
    placeholderData: keepPreviousData,
  })

  // 提交表单
  const onSubmit = (data: CreateHttpMessageTaskInput) => {
    createMutation.mutate(data, {
        onSuccess: () => {
          setOpen(null)
          form.reset()
        }
      })
  }

  // 关闭对话框
  const onClose = () => {
    setOpen(null)
    form.reset()
  }

  const isLoading = createMutation.isPending

  return (
    <Dialog open={!!open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建好友私信任务</DialogTitle>
          <DialogDescription>
            创建一个新的好友私信任务。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* 名称字段 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input placeholder="输入任务名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />      

            {/* 描述字段 */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="描述此任务的用途"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* 分组选择 - 使用Combobox替代简单Select以支持搜索 */}
             <FormField
              control={form.control}
              name='groupId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>账号组</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? groupOptions?.find(
                              (group) => group.value === field.value
                            )?.label
                            : "选择账号组"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command shouldFilter={false}>
                        <CommandInput placeholder="搜索账号组..." onValueChange={setSearchTerm} />
                        <CommandList>
                          <CommandEmpty>未能找到账号组</CommandEmpty>
                          <CommandGroup>
                            {groupOptions?.map((group) => (
                              <CommandItem
                                value={group.value}
                                key={group.value}
                                onSelect={() => {
                                  form.setValue("groupId", group.value)
                                }}
                              >
                                {group.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    group.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* 模板选择 */}
             <FormField
              control={form.control}
              name='templateId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>私信模板</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? templateOptions?.find(
                              (item) => item.value === field.value
                            )?.label
                            : "选择私信模板"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command shouldFilter={false}>
                        <CommandInput placeholder="搜索私信模板..." onValueChange={setSearchTerm} />
                        <CommandList>
                          <CommandEmpty>未能找到私信模板</CommandEmpty>
                          <CommandGroup>
                            {templateOptions?.map((item) => (
                              <CommandItem
                                value={item.value}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("templateId", item.value)
                                }}
                              >
                                {item.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    item.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 发送消息间隔时间 */}
            <FormField
              control={form.control}
              name='interval'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>发送消息间隔时间</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="输入发送消息间隔时间" 
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value === undefined ? '' : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* 地区字段 */}
             <FormField
              control={form.control}
              name="regions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地区</FormLabel>
                  <MultipleRegionSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 发送模式 */}
            <FormField
              control={form.control}
              name="sendMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>发送模式</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择发送模式" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(messageSendModeSchema.shape).map((key) => (
                          <SelectItem key={key} value={key}>
                            {messageSendModeSchema.shape[key as keyof typeof messageSendModeSchema.shape].value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
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