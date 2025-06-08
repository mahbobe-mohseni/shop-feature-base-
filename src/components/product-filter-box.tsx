"use client"

import * as React from "react"
import { Search, X, Filter, Star } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample data - replace with your WooCommerce data
const categories = [
  { id: "electronics", name: "Electronics", count: 45 },
  { id: "clothing", name: "Clothing", count: 32 },
  { id: "home-garden", name: "Home & Garden", count: 28 },
  { id: "sports", name: "Sports & Outdoors", count: 19 },
  { id: "books", name: "Books", count: 15 },
  { id: "toys", name: "Toys & Games", count: 12 },
]

const brands = [
  { id: "apple", name: "Apple", count: 8 },
  { id: "samsung", name: "Samsung", count: 12 },
  { id: "nike", name: "Nike", count: 15 },
  { id: "adidas", name: "Adidas", count: 10 },
  { id: "sony", name: "Sony", count: 7 },
  { id: "lg", name: "LG", count: 5 },
]

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#EF4444" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Yellow", value: "#F59E0B" },
]

interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  onSale: boolean
  sizes: string[]
  colors: string[]
  searchTerm: string
}

export default function ProductFilterBox() {
  const [filters, setFilters] = React.useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    onSale: false,
    sizes: [],
    colors: [],
    searchTerm: "",
  })

  const [isOpen, setIsOpen] = React.useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, categoryId] : prev.categories.filter((id) => id !== categoryId),
    }))
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      brands: checked ? [...prev.brands, brandId] : prev.brands.filter((id) => id !== brandId),
    }))
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      sizes: checked ? [...prev.sizes, size] : prev.sizes.filter((s) => s !== size),
    }))
  }

  const handleColorChange = (color: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      colors: checked ? [...prev.colors, color] : prev.colors.filter((c) => c !== color),
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
      onSale: false,
      sizes: [],
      colors: [],
      searchTerm: "",
    })
  }

  const getActiveFiltersCount = () => {
    return (
      filters.categories.length +
      filters.brands.length +
      filters.sizes.length +
      filters.colors.length +
      (filters.inStock ? 1 : 0) +
      (filters.onSale ? 1 : 0) +
      (filters.rating > 0 ? 1 : 0) +
      (filters.searchTerm ? 1 : 0)
    )
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-sm">
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Products</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search products..."
                value={filters.searchTerm}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))}
                className="pl-8"
              />
              {filters.searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-6 w-6 p-0"
                  onClick={() => setFilters((prev) => ({ ...prev, searchTerm: "" }))}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Accordion Filters */}
          <Accordion type="multiple" defaultValue={["categories", "price", "brands"]} className="w-full">
            {/* Categories */}
            <AccordionItem value="categories">
              <AccordionTrigger className="text-sm font-medium">
                Categories
                {filters.categories.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.categories.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                      />
                      <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer flex-1">
                        {category.name}
                      </Label>
                      <span className="text-xs text-muted-foreground">({category.count})</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Range */}
            <AccordionItem value="price">
              <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                    }
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Brands */}
            <AccordionItem value="brands">
              <AccordionTrigger className="text-sm font-medium">
                Brands
                {filters.brands.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.brands.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand.id}
                        checked={filters.brands.includes(brand.id)}
                        onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                      />
                      <Label htmlFor={brand.id} className="text-sm font-normal cursor-pointer flex-1">
                        {brand.name}
                      </Label>
                      <span className="text-xs text-muted-foreground">({brand.count})</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Rating */}
            <AccordionItem value="rating">
              <AccordionTrigger className="text-sm font-medium">Customer Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={filters.rating === rating}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            rating: checked ? rating : 0,
                          }))
                        }
                      />
                      <Label
                        htmlFor={`rating-${rating}`}
                        className="text-sm font-normal cursor-pointer flex items-center gap-1"
                      >
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        & Up
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Sizes */}
            <AccordionItem value="sizes">
              <AccordionTrigger className="text-sm font-medium">
                Sizes
                {filters.sizes.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.sizes.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={filters.sizes.includes(size)}
                        onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                      />
                      <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Colors */}
            <AccordionItem value="colors">
              <AccordionTrigger className="text-sm font-medium">
                Colors
                {filters.colors.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.colors.length}
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-3">
                  {colors.map((color) => (
                    <div key={color.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color.name}`}
                        checked={filters.colors.includes(color.name)}
                        onCheckedChange={(checked) => handleColorChange(color.name, checked as boolean)}
                      />
                      <Label
                        htmlFor={`color-${color.name}`}
                        className="text-sm font-normal cursor-pointer flex items-center gap-2"
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.value }}
                        />
                        {color.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Availability & Special Offers */}
            <AccordionItem value="availability">
              <AccordionTrigger className="text-sm font-medium">Availability & Offers</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, inStock: checked as boolean }))}
                    />
                    <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                      In Stock Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={filters.onSale}
                      onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, onSale: checked as boolean }))}
                    />
                    <Label htmlFor="on-sale" className="text-sm font-normal cursor-pointer">
                      On Sale
                    </Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Apply Filters Button */}
          <div className="pt-4">
            <Button className="w-full" size="lg">
              Apply Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white text-primary">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
