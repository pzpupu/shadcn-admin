'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user-service'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userService.deleteById(id),
    onSuccess: () => {
      toast.success('用户删除成功')
      queryClient.invalidateQueries({ queryKey: [userService.path] })
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('删除用户失败:', error)
      toast.error('删除用户失败')
    },
  })

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return
    deleteMutation.mutate(currentRow.id, {
      onSuccess: () => {
        onOpenChange(false)
      }
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          删除用户
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            确定要删除用户{' '}
            <span className='font-bold'>{currentRow.username}</span>?
          </p>

          <Label className='my-2'>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='输入用户名确认删除。'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>警告！</AlertTitle>
            <AlertDescription>
              请谨慎操作，该操作无法撤销。
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
