import React, {createContext, useState} from 'react'
import useDialogState from '@/hooks/use-dialog-state'


export type Open = string | boolean;

// 上下文类型
export interface DataTableContextType<T, D extends Open> {
    current: T | null
    setCurrent: React.Dispatch<React.SetStateAction<T | null>>
    open: D | null
    setOpen: (str: D | null) => void
}

// 创建上下文
/* eslint-disable */
export const DataTableContext = createContext<DataTableContextType<any, any> | null>(null)

// 上下文提供者Props类型
interface Props {
    children: React.ReactNode
}

// 上下文提供者组件
export default function DataTableProvider<T, D extends Open>({children}: Props) {
    const [open, setOpen] = useDialogState<D>(null)
    const [current, setCurrent] = useState<T | null>(null)


    return (
        <DataTableContext.Provider
            value={{
                open,
                setOpen,
                current,
                setCurrent
            }}
        >
            {children}
        </DataTableContext.Provider>
    )
}