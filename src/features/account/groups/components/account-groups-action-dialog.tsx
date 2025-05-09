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
import { useAccountGroupsContext } from '../context/account-groups-context'
import {
  CreateAccountGroupInput,
  createAccountGroupSchema,
  UpdateAccountGroupInput
} from '../data/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountGroupService } from '@/services/account-group-service'
import { toast } from 'sonner'
import RegionSelect from '@/components/select/region-select'

export function AccountGroupsActionDialog() {
  const { open, setOpen, currentGroup, setCurrentGroup } = useAccountGroupsContext()
  const isEditing = open === 'edit'

  const queryClient = useQueryClient()

  // 创建和更新的mutation hooks
  const createMutation = useMutation({
    mutationFn: (data: CreateAccountGroupInput) => accountGroupService.create(data),
    onSuccess: () => {
      toast.success('账号组创建成功', { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: [accountGroupService.path] })
    },
    onError: (error) => {
      console.error('创建账号组失败:', error)
      toast.error('创建账号组失败')
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateAccountGroupInput) => accountGroupService.update(data),
    onSuccess: () => {
      toast.success('账号组更新成功', { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: [accountGroupService.path] })
    },
    onError: (error) => {
      console.error('更新账号组失败:', error)
      toast.error('更新账号组失败')
    },
  })

  // 表单实例
  const form = useForm<CreateAccountGroupInput>({
    resolver: zodResolver(createAccountGroupSchema),
    defaultValues: {
      name: currentGroup?.name || '',
      description: currentGroup?.description || '',
      region: currentGroup?.region || undefined,
    },
  })

  // 提交表单
  const onSubmit = (data: CreateAccountGroupInput) => {
    if (isEditing && currentGroup) {
      updateMutation.mutate({
        ...data,
        id: currentGroup.id,
      }, {
        onSuccess: () => {
          setOpen(null)
          form.reset()
        }
      })
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setOpen(null)
          form.reset()
        }
      })
    }
  }

  // 关闭对话框
  const onClose = () => {
    setCurrentGroup(null)
    setOpen(null)
    form.reset()
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={!!open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? '编辑账号组' : '创建账号组'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? '修改账号组的信息和权限设置。'
              : '创建一个新的账号组并设置其基本信息。'
            }
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
                    <Input placeholder="输入账号组名称" {...field} />
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
                      placeholder="描述此账号组的用途"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 地区字段 */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地区</FormLabel>
                  <RegionSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
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
                {isLoading ? '处理中...' : isEditing ? '保存更改' : '创建'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 