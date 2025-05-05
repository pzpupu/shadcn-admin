import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { regions } from "@/types/region"

export default function RegionSelect({ onValueChange, defaultValue }: { onValueChange: (value: string) => void, defaultValue: string }) {
    const [searchQuery, setSearchQuery] = useState("")

    // 过滤每个分组中的水果
    const filteredRegions = regions
        .map((group) => ({
            ...group,
            items: group.options.filter((fruit) => fruit.name.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((group) => group.items.length > 0) // 只保留有匹配项的分组

    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="选择地区" className="font-normal"/>
            </SelectTrigger>
            <SelectContent>
                <div className="flex items-center border-b px-3 pb-2">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Input
                        placeholder="搜索地区..."
                        className="shadow-none border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {filteredRegions.map((region) => (
                    <SelectGroup key={region.label}>
                        <SelectLabel>{region.label}</SelectLabel>
                        {region.options.map((option) => (
                            <SelectItem key={option.code} value={option.code}>{option.name}</SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    )
}
