"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../product-card";
import { productsMockData } from "@/data/products";
import { getProducts } from "@/services";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const handlGetProducts = async () => {
    try {
      const { state, data } = await getProducts();
      if (state) {
        setProducts(data);
      }
    } catch (error) {
      console.log("🚀 ~ handlGetProducts ~ error:", error);
    }
  };

  useEffect(() => {
    handlGetProducts();
  }, []);

  return (
    <div className="flex items-center justify-center gap-10 flex-wrap m-auto w-full">
      {products.map((item, index) => {
        return <ProductCard key={index} product={item} />;
      })}
    </div>
  );
};

export default ProductsList;
