import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discount: number;
  description?: string;
  isNew: boolean;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { price, discount } = product;

  const finalPrice = price - (price * discount) / 100;

  return (
    <Card className="w-full max-w-sm bg-muted p-4 rounded-2xl shadow-md text-right ">
      <CardContent className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-sm text-muted-foreground">
            {product.description || "توضیحات محصول در دسترس نیست."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-yellow-700 bg-yellow-100">
            ۶/۱۰
          </Badge>
          <a
            href="#"
            className="text-sm font-medium underline text-primary hover:text-primary/80"
          >
            بررسی کامل محصول
          </a>
        </div>

        <div className="relative w-full h-40">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-2 w-full bg-gray-300 p-2 rounded-lg">
          {discount > 0 ? (
            <>
              <span className="font-bold line-through text-red-500">
                {product.price.toLocaleString()}
              </span>
              <span className="font-bold">{finalPrice.toLocaleString()}</span>
            </>
          ) : (
            <span className="font-bold">{product.price.toLocaleString()}</span>
          )}
          <span className="text-sm text-gray-600">تومان</span>
        </div>

        <div className="grid gap-2">
          <Button variant="ghost" disabled className="justify-between">
            <span className="text-muted-foreground">
              {product.isNew ? "محصول نو" : "محصول دست دوم"}
            </span>
            <span className="text-muted-foreground">موجود نیست</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
