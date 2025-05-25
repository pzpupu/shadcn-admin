import { useForm } from "react-hook-form"
import { useAccountListContext } from "../context/account-list-context"
import { UpdateAccountForm, updateAccountSchema } from "../data/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "@/services/account-services"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { Result } from "@/types/result"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

/**
 * 账号列表更新对话框组件实现
 */
export function AccountListUpdateDialog() {
    const { current, open, setOpen } = useAccountListContext()

    if(current == null) return;
    
    // 创建表单
    const form = useForm<UpdateAccountForm>({
        resolver: zodResolver(updateAccountSchema),
        defaultValues: {
            jsonl: undefined,
        },
    })

    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: (data: UpdateAccountForm) => accountService.updateAccount(current!.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [accountService.path] })
            setOpen(null)
            toast.success('更新账号成功')
        },
        onError: (error: AxiosError<Result<unknown>>) => {
            toast.error(error.response?.data?.message || '更新账号失败')
        }
    })

    const onSubmit = async (data: UpdateAccountForm) => {
        updateMutation.mutate(data)
    }

    return (
        <Dialog open={open === 'update'} onOpenChange={(isOpen) => !isOpen && setOpen(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>更新账号</DialogTitle>
                    <DialogDescription>
                        更新账号信息
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="jsonl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>账号数据</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="请在此处粘贴jsonl文件内容"
                                            className="resize-none h-50"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? '更新中...' : '更新'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}