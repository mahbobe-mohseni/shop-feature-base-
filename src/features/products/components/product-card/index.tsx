"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discount: number;
  description?: string;
  // isNew: boolean;
  inStock: boolean;
  partNumber?: string;
  category?: string;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { handleAddToCart, cartItems } = useCartStore();

  const { price, discount } = product;
  const finalPrice = price - (price * discount) / 100;

  const onAddToCart = () => {
    if (product.inStock) {
      // add to store
      handleAddToCart(product);

      setIsAdded(true);

      // Reset the "added" state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
    const updatedProduct = { ...product, quantity };
    handleAddToCart(updatedProduct);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <Card className="w-full h-[500px] max-w-sm bg-muted p-4 rounded-2xl shadow-md text-right hover:shadow-lg transition-shadow mb-8">
      <CardContent className="flex flex-col gap-4 px-0">
        {/* Product Header */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-nowrap">{product.name}</h2>
            {/* {product.isNew && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                جدید
              </Badge>
            )} */}
          </div>
          <div className="relative overflow-hidden w-full h-6">
            <p className="absolute whitespace-nowrap animate-loop text-sm text-muted-foreground">
              {product.description || "توضیحات محصول در دسترس نیست."}
            </p>
          </div>

          {product.partNumber && (
            <p className="text-xs text-gray-500 mt-1">
              کد قطعه: {product.partNumber}
            </p>
          )}
        </div>

        {/* Product Image */}
        <div className="relative w-full h-40 rounded-lg">
          <Image
            src={product.imageUrl || "/images/new.jpg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 w-full bg-gray-300 p-2 rounded-lg">
          {discount > 0 ? (
            <>
              <span className="font-bold line-through text-red-500 hidden">
                {formatPrice(product.price)}
              </span>
              <span className="font-bold text-green-600">
                {formatPrice(finalPrice)}
              </span>
              <Badge className="bg-red-100 text-red-800 text-xs mr-2">
                {discount}% تخفیف
              </Badge>
            </>
          ) : (
            <span className="font-bold hidden">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="text-sm text-gray-600 hidden">تومان</span>
          <span className="text-sm text-gray-600 text-center w-full">
            جهت استعلام قیمت تماس بگیرید
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <Badge
            className={`text-xs ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "موجود" : "ناموجود"}
          </Badge>
          {/* <span className="text-sm text-muted-foreground">
            {product.isNew ? "محصول نو" : "محصول دست دوم"}
          </span> */}
        </div>

        {/* Add to Cart Button - Always Visible */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-8 w-8 p-0 bg-transparent"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = Number.parseInt(e.target.value) || 1;
                  setQuantity(val > 0 ? val : 1);
                }}
                className="w-16 text-center h-8"
                min="1"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                className="h-8 w-8 p-0 bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={onAddToCart}
              className={`w-full ${
                isAdded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isAdded || !product.inStock}
              size="lg"
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  اضافه شد به سبد
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  افزودن به سبد خرید
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Category - Move to above the cart section */}
        {product.category && (
          <div className="text-center mt-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
