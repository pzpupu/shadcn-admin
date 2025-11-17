import { useForm } from "react-hook-form"
import { useAccountListContext } from "../context/account-list-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { accountService } from "@/services/account-services"
import { accountGroupService } from "@/services/account-group-service"
import { toast } from "sonner"
import { AxiosError, AxiosResponse } from "axios"
import { Result } from "@/types/result"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useEffect, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandLoading } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

// 批量移动表单验证schema
const batchMoveSchema = z.object({
  groupId: z.string().min(1, "请选择目标分组"),
})
type BatchMoveForm = z.infer<typeof batchMoveSchema>

/**
 * 账号列表批量移动对话框组件实现
 */
export function AccountListBatchMoveDialog() {
    const { open, setOpen, selectedAccounts } = useAccountListContext()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [popoverOpen, setPopoverOpen] = useState(false)

    // 创建表单
    const form = useForm<BatchMoveForm>({
        resolver: zodResolver(batchMoveSchema),
        defaultValues: {
            groupId: "",
        },
    })

    // 获取分组选项 - 支持搜索
    const { data: groups, isLoading: isLoadingGroups } = useQuery({
        queryKey: [`${accountGroupService.path}/options`, searchTerm],
        queryFn: () => accountGroupService.getOptions(searchTerm, 10),
        enabled: open === 'batchMove',
    })

    const queryClient = useQueryClient()

    const moveMutation = useMutation({
        mutationFn: (data: BatchMoveForm) => {
            const accountIds = selectedAccounts.map(account => account.id)
            return accountService.batchMoveToGroup(accountIds, data.groupId)
        },
        onSuccess: (data: AxiosResponse<Result<number>>) => {
            queryClient.invalidateQueries({ queryKey: [accountService.path] })
            setOpen(null)
            toast.success(data.data?.message || '批量移动账号成功', {
                description: `成功移动 ${selectedAccounts.length} 个账号`,
            })
            form.reset()
        },
        onError: (error: AxiosError<Result<unknown>>) => {
            toast.error(error.response?.data?.message || '批量移动账号失败', {
                description: error.response?.data?.desc
            })
        }
    })

    const onSubmit = async (data: BatchMoveForm) => {
        moveMutation.mutate(data)
    }

    // 当dialog关闭时重置表单和搜索
    useEffect(() => {
        if (open !== 'batchMove') {
            form.reset()
            setSearchTerm('')
            setPopoverOpen(false)
        }
    }, [open, form])

    return (
        <Dialog open={open === 'batchMove'} onOpenChange={(isOpen) => !isOpen && setOpen(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>批量移动账号到分组</DialogTitle>
                    <DialogDescription>
                        将选中的 {selectedAccounts.length} 个账号移动到指定分组
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="groupId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>目标分组</FormLabel>
                                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? groups?.find((group) => group.value === field.value)?.label
                                                        : "选择目标分组"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start">
                                            <Command shouldFilter={false}>
                                                <CommandInput 
                                                    placeholder="搜索分组..." 
                                                    value={searchTerm} 
                                                    onValueChange={setSearchTerm}
                                                />
                                                <CommandList>
                                                    {isLoadingGroups && (
                                                        <CommandLoading>
                                                            <div className="flex items-center justify-center py-4">
                                                                <Spinner className="h-4 w-4" />
                                                                <span className="ml-2 text-sm text-muted-foreground">加载中...</span>
                                                            </div>
                                                        </CommandLoading>
                                                    )}
                                                    <CommandEmpty>无匹配结果</CommandEmpty>
                                                    <CommandGroup>
                                                        {groups?.map((group) => (
                                                            <CommandItem
                                                                value={group.value}
                                                                key={group.value}
                                                                onSelect={() => {
                                                                    form.setValue("groupId", group.value)
                                                                    setPopoverOpen(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        group.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {group.label}
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
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(null)}>
                                取消
                            </Button>
                            <Button type="submit" disabled={moveMutation.isPending}>
                                {moveMutation.isPending ? '移动中...' : '确认移动'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

