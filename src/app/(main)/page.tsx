import React from "react";
import BeautifulSlider from "@/components/layout/ui/BeautifulSlider";
// import ProductFilterBox from "@/components/layout/ui/product-filter-box";
import ProductsList from "@/features/products/components/products-list";
const Page = () => {
  return (
    <div className="bg-background text-foreground">
      {/* slider */}
      <BeautifulSlider />

      {/* products section */}
      <div className="flex w-full items-start md:flex-row flex-col justify-between gap-4 rtl px-4 pt-10 bg-background sticky top-[225px]">

        {/* desktop filters */}
        {/* <div className="min-w-sm lg:block sticky top-[225px] hidden">
          <ProductFilterBox />
        </div> */}

        <div className="flex flex-col gap-5">
          {/* mobile filters */}
          {/* <div className="lg:hidden">
            <ProductFilterBox />
          </div> */}

          {/* products list */}
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default Page;
