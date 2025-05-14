import { DataTableToolbarProps } from "@/components/data-table";
import ProTablePagination from "@/components/data-table/data-table-pagination";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Route } from "@/routes/_authenticated/task/friend-message/$taskId/logs";
import { PagedModel } from "@/types/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";
import {httpMessageTaskService} from "@/services/http-message-service.ts";

export function FriendMessageLogDataTable<T>({ columns, Toolbar }: {
    columns: ColumnDef<T>[]
    Toolbar?: React.ComponentType<DataTableToolbarProps<T>>
}) {

    const { taskId } = Route.useParams()

    const [sorting, setSorting] = useState<SortingState>([
        { id: 'createdAt', desc: true },
    ])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const { data, isLoading } = useQuery<PagedModel<T>>({
        queryKey: [`task/httpMessage/${taskId}/logs`, pagination, columnFilters, sorting],
        queryFn: httpMessageTaskService.logsPage,
        placeholderData: keepPreviousData,
    })

    const table = useReactTable<T>({
        data: data?.content || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true, // 手动分页
        manualFiltering: true, // 手动筛选
        manualSorting: true, // 手动排序
        pageCount: data?.page.totalPages || 0,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        // debugTable: true,
        // debugColumns: true,
        // debugAll: true,
    })

    if (isLoading) {
        // 首次加载中，显示loading
        return (
            <div className="flex h-96 w-full items-center justify-center">
                <Spinner />
            </div>
        )
    }


    return (
        <div className="space-y-4">
            {/* <DataTableToolbar table={table} /> */}
            {Toolbar && <Toolbar table={table} />}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    暂无数据
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <ProTablePagination table={table} />
        </div>
    )
} 