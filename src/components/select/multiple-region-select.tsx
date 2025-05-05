"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { RegionGroup, regionGroups } from "@/types/region"

export default function MultipleRegionSelect({ onValueChange, defaultValue }: { onValueChange: (value: string[]) => void, defaultValue: string[] }) {
    const [open, setOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue || [])
    const [filteredRegions, setFilteredRegions] = useState<RegionGroup[]>(regionGroups)
    // 所有地区的平面列表，用于查找标签
    const allRegions = regionGroups.flatMap((group) => group.options)

    // 获取选中项的标签
    const getSelectedItemLabels = () => {
        return selectedValues.map((value) => {
            const region = allRegions.find((region) => region.code === value)
            return region ? region.name : value
        })
    }


    // 根据搜索条件过滤地区
    const fileter = (searchQuery: string) => {
        var filteredRegions1 = regionGroups
            .map((group) => ({
                ...group,
                options: group.options.filter((region) => region.code.toLowerCase().includes(searchQuery.toLowerCase()) || region.name.toLowerCase().includes(searchQuery.toLowerCase())),
            }))
            .filter((group) => group.options.length > 0)
        setFilteredRegions([...filteredRegions1])
    }


    // 处理选择/取消选择
    const toggleSelection = (value: string) => {
        setSelectedValues((current) => (current.includes(value) ? current.filter((v) => v !== value) : [...current, value]))
        onValueChange(selectedValues)
    }

    // 移除选中项
    const removeItem = (value: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setSelectedValues((current) => current.filter((v) => v !== value))
        onValueChange(selectedValues)
    }

    // 清除所有选中项
    const clearAll = () => {
        setSelectedValues([])
        onValueChange(selectedValues)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[300px] overflow-hidden">
                        {selectedValues.length > 0 ? (
                            selectedValues.length <= 3 ? (
                                getSelectedItemLabels().map((label, index) => (
                                    <Badge key={index} variant="secondary" className="">
                                        {label}
                                        <span
                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onClick={(e) => removeItem(selectedValues[index], e)}
                                        >
                                            <X className="h-3 w-3" />
                                            <span className="sr-only">移除 {label}</span>
                                        </span>
                                    </Badge>
                                ))
                            ) : (
                                <span>已选择 {selectedValues.length} 项</span>
                            )
                        ) : (
                            <span className="text-muted-foreground font-normal h-full">选择地区...</span>
                        )}
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false}>
                    <div className="flex items-center px-3 py-2">
                        <CommandInput
                            placeholder="搜索地区..."
                            onValueChange={fileter}
                            className="h-8 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {selectedValues.length > 0 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={clearAll}
                                className="h-6 w-6 rounded-full"
                                title="清除所有选择"
                                aria-label="清除所有选择"
                            >
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        )}
                    </div>
                    <CommandList>
                        <CommandEmpty>没有找到匹配的地区</CommandEmpty>
                        {filteredRegions.map((group, index) => (
                            <CommandGroup key={index} heading={group.label}>
                                {group.options.map((region) => {
                                    const isSelected = selectedValues.includes(region.code)
                                    return (
                                        <CommandItem
                                            key={region.code}
                                            onSelect={() => toggleSelection(region.code)}
                                            className={cn("flex items-center justify-between", isSelected && "bg-accent font-medium")}
                                        >
                                            <span>{region.code}|{region.name}</span>
                                            {isSelected && <Check className="h-4 w-4" />}
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
