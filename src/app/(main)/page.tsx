import React from "react";
import BeautifulSlider from "@/components/layout/ui/BeautifulSlider";
import ProductFilterBox from "@/components/layout/ui/product-filter-box";
import ProductsList from "@/features/products/components/products-list";
const Page = () => {
  return (
    <div className="bg-background text-foreground">
      {/* slider */}
      <BeautifulSlider />

      {/* products section */}
      <div className="flex w-full items-start md:flex-row flex-col justify-start gap-6 rtl px-4 pt-10">
        
        {/* desktop filters */}
        <div className="min-w-sm lg:block hidden">
          <ProductFilterBox />
        </div>

        <div className="flex flex-col gap-5">
          {/* mobile filters */}
          <div className="lg:hidden">
            <ProductFilterBox />
          </div>

          {/* products list */}
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default Page;
