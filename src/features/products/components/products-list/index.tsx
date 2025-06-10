import React from "react";
import ProductCard from "../product-card";
import { productsMockData } from "@/data/products";

const ProductsList = () => {
  return (
    <div className="flex items-center justify-center gap-10 flex-wrap m-auto w-full">
      {productsMockData.map((item, index) => {
        return <ProductCard key={index} product={item} />;
      })}
    </div>
  );
};

export default ProductsList;
