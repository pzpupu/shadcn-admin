'use client'

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
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { CreateUserForm, createUserFormSchema, UpdateUserForm, updateUserFormSchema, User, UserRole, UserRoleEnum } from '../data/schema'
import { Switch } from '@/components/ui/switch'
import { userService } from '@/services/user-service'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'



interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<CreateUserForm | UpdateUserForm>({
    resolver: zodResolver(isEdit ? updateUserFormSchema : createUserFormSchema),
    defaultValues: isEdit
      ? {
        ...currentRow,
        role: currentRow?.role,
        password: '[PROTECTION]',
      }
      : {
        username: '',
        enabled: true,
        role: UserRoleEnum.Enum.USER,
        proxy: {
          proxyHost: '',
          proxyPort: undefined,
          proxyUsername: '',
          proxyPassword: '',
        },
        password: '',
      },
  })

  const queryClient = useQueryClient()
  
  const createMutation = useMutation({
    mutationFn: (data: CreateUserForm) => userService.create(data),
    onSuccess: () => {
      toast.success('用户创建成功', { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: [userService.path] })
    },
    onError: (error) => {
      console.error('创建用户失败:', error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: UpdateUserForm) => userService.update(data),
    onSuccess: () => {
      toast.success('用户更新成功', { duration: 2000 })
      queryClient.invalidateQueries({ queryKey: [userService.path] })
    },
  })

  const onSubmit = (values: CreateUserForm | UpdateUserForm) => {
    if (isEdit) {
      updateMutation.mutate({
        ...values,
        id: currentRow?.id,
      }, {
        onSuccess: () => {
          form.reset()
          onOpenChange(false)
        }
      })
    } else {
      createMutation.mutate(values,{
        onSuccess: () => {
          form.reset()
          onOpenChange(false)
        }
      })
    }
  }


  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? '编辑用户' : '添加新用户'}</DialogTitle>
          <DialogDescription>
            {isEdit ? '更新用户信息。' : '创建新用户。'}
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      用户名
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      密码
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='enabled'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      状态
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      角色
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='选择角色'
                      className='w-full'
                      items={Object.entries(UserRole.shape).map(([key, value]) => ({
                        label: value.value,
                        value: key,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-sm text-muted-foreground">代理</p>
              <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-4"></div>

              <FormField
                control={form.control}
                name='proxy.proxyHost'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-8 items-center space-y-0 gap-x-2 gap-y-1'>
                    <FormLabel>
                      主机
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='off'
                        className='col-span-7 w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-7 col-start-2' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='proxy.proxyPort'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-8 items-center space-y-0 gap-x-2 gap-y-1'>
                    <FormLabel>
                      端口
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        autoComplete='off'
                        className='col-span-7 w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-7 col-start-2' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='proxy.proxyUsername'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-8 items-center space-y-0 gap-x-2 gap-y-1'>
                    <FormLabel>
                      用户名
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='off'
                        className='col-span-7 w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-7 col-start-2' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='proxy.proxyPassword'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-8 items-center space-y-0 gap-x-2 gap-y-1'>
                    <FormLabel>
                      密码
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='off'
                        className='col-span-7 w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-7 col-start-2' />
                  </FormItem>
                )}
              />

            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
