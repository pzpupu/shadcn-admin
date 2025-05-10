// 自定义Hook，用于访问上下文
import {useContext} from "react";
import {DataTableContext, DataTableContextType } from "./data-table-context";

export const useDataTableContext = <T, D extends string | boolean>(): DataTableContextType<T, D> => {
    const dataTableContext = useContext(DataTableContext)

    if (!dataTableContext) {
        throw new Error('useDataTableContext 必须在 DataTableProvider 内部使用')
    }

    return dataTableContext
};