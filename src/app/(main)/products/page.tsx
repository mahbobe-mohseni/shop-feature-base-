import { Breadcrumb } from "@/components/global/breadcrumb";
import ProductsList from "@/features/products/components/products-list";
import React from "react";

const products = () => {


  const items = [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'محصولات' }
  ]
  return (
    <>
      <Breadcrumb items={items} title="محصولات" />
      <div className="p-6">
        <ProductsList />
      </div>
    </>
  );
};

export default products;
