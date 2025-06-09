import React from "react";
import BeautifulSlider from "@/components/BeautifulSlider";
import ProductFilterBox from "@/components/product-filter-box";
import ProductsList from "@/features/products/components/products-list";
import Footer from "@/components/layout/footer";
const Page = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-sm">
          <ProductFilterBox />
        </div>

        <div className="flex flex-col gap-5">
          <div className="mt-10">
            <BeautifulSlider />
          </div>
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default Page;
