
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ShopFiltersProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

export default function ShopFilters({
    sortBy,
    onSortChange,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery
}: ShopFiltersProps) {

    return (
        <div className="space-y-8 p-6 bg-white border border-gray-100 rounded-lg shadow-sm sticky top-24">

            {/* Search */}
            <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-wide">Search</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        className="pl-9 bg-gray-50 border-gray-200"
                        placeholder="Find products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm uppercase tracking-wide">Price</h3>
                    <span className="text-xs text-gray-500">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                />
            </div>

            {/* Sort */}
            <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-wide">Sort By</h3>
                <Select value={sortBy} onValueChange={onSortChange}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest Arrivals</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Categories List (Quick Filter) */}
            <div className="space-y-2">
                <h3 className="font-bold text-sm uppercase tracking-wide mb-3">Refine</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2 cursor-pointer hover:text-design-teal">
                        <div className="w-4 h-4 border rounded" /> On Sale
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer hover:text-design-teal">
                        <div className="w-4 h-4 border rounded" /> In Stock
                    </li>
                </ul>
            </div>

        </div>
    );
}
