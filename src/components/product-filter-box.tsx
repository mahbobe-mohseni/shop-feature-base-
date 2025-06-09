"use client";

import * as React from "react";
import { Search, X, Filter, Star } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "engine", name: "موتور", count: 45 },
  { id: "suspension", name: "سیستم تعلیق", count: 32 },
  { id: "brake", name: "ترمز", count: 28 },
  { id: "electric", name: "برق خودرو", count: 19 },
  { id: "body", name: "بدنه", count: 15 },
  { id: "interior", name: "داخلی کابین", count: 12 },
];

const brands = [
  { id: "saipa", name: "سایپا", count: 12 },
  { id: "ismaco", name: "ایساکو", count: 9 },
  { id: "mahdi", name: "مهدی یدک", count: 6 },
  { id: "mehrkam", name: "مهرکام پارس", count: 7 },
  { id: "seco", name: "سکو", count: 4 },
];

const colors = [
  { name: "مشکی", value: "#000000" },
  { name: "سفید", value: "#FFFFFF" },
  { name: "نقره‌ای", value: "#C0C0C0" },
  { name: "قرمز", value: "#EF4444" },
];

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
  colors: string[];
  searchTerm: string;
}

export default function ProductFilterBox() {
  const [filters, setFilters] = React.useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 10000000],
    rating: 0,
    inStock: false,
    onSale: false,
    colors: [],
    searchTerm: "",
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter((id) => id !== categoryId),
    }));
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      brands: checked
        ? [...prev.brands, brandId]
        : prev.brands.filter((id) => id !== brandId),
    }));
  };

  const handleColorChange = (color: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      colors: checked
        ? [...prev.colors, color]
        : prev.colors.filter((c) => c !== color),
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 10000000],
      rating: 0,
      inStock: false,
      onSale: false,
      colors: [],
      searchTerm: "",
    });
  };

  const getActiveFiltersCount = () => {
    return (
      filters.categories.length +
      filters.brands.length +
      filters.colors.length +
      (filters.inStock ? 1 : 0) +
      (filters.onSale ? 1 : 0) +
      (filters.rating > 0 ? 1 : 0) +
      (filters.searchTerm ? 1 : 0)
    );
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="w-full mt-5">
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            فیلترها
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </div>
        </Button>
      </div>

      <Card className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              فیلتر محصولات
            </CardTitle>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-sm"
              >
                پاک کردن همه
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">جستجوی قطعات</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="مثلاً لنت جلو..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }))
                }
                className="pl-8"
              />
              {filters.searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-6 w-6 p-0"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, searchTerm: "" }))
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          <Separator />

          <Accordion
            type="multiple"
            defaultValue={["categories", "price", "brands"]}
          >
            <AccordionItem value="categories">
              <AccordionTrigger className="text-sm font-medium">
                دسته‌بندی قطعات
                {filters.categories.length > 0 && (
                  <Badge variant="secondary">{filters.categories.length}</Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cat.id}
                      checked={filters.categories.includes(cat.id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(cat.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={cat.id}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {cat.name}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      ({cat.count})
                    </span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger className="text-sm font-medium">
                محدوده قیمت (تومان)
              </AccordionTrigger>
              <AccordionContent>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(val) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: val as [number, number],
                    }))
                  }
                  max={10000000}
                  min={0}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>{filters.priceRange[0].toLocaleString()} تومان</span>
                  <span>{filters.priceRange[1].toLocaleString()} تومان</span>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brands">
              <AccordionTrigger className="text-sm font-medium">
                برندها
                {filters.brands.length > 0 && (
                  <Badge variant="secondary">{filters.brands.length}</Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand.id}
                      checked={filters.brands.includes(brand.id)}
                      onCheckedChange={(checked) =>
                        handleBrandChange(brand.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={brand.id}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {brand.name}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      ({brand.count})
                    </span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating">
              <AccordionTrigger className="text-sm font-medium">
                امتیاز مشتریان
              </AccordionTrigger>
              <AccordionContent>
                {[5, 4, 3, 2, 1].map((rate) => (
                  <div key={rate} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rate-${rate}`}
                      checked={filters.rating === rate}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          rating: checked ? rate : 0,
                        }))
                      }
                    />
                    <Label
                      htmlFor={`rate-${rate}`}
                      className="text-sm flex items-center gap-1"
                    >
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < rate
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      و بالاتر
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="colors">
              <AccordionTrigger className="text-sm font-medium">
                رنگ‌ها
                {filters.colors.length > 0 && (
                  <Badge variant="secondary">{filters.colors.length}</Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-3">
                  {colors.map((color) => (
                    <div
                      key={color.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`color-${color.name}`}
                        checked={filters.colors.includes(color.name)}
                        onCheckedChange={(checked) =>
                          handleColorChange(color.name, checked as boolean)
                        }
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

            <AccordionItem value="availability">
              <AccordionTrigger className="text-sm font-medium">
                موجودی و تخفیف
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          inStock: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="in-stock"
                      className="text-sm font-normal cursor-pointer"
                    >
                      فقط کالاهای موجود
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={filters.onSale}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          onSale: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="on-sale"
                      className="text-sm font-normal cursor-pointer"
                    >
                      کالاهای تخفیف‌دار
                    </Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-4">
            <Button className="w-full" size="lg">
              اعمال فیلترها
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-white text-primary"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
