"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/type/Product";
import { query } from "@/sanity/lib/query";

const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [exclusiveProducts, setExclusiveProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts: Product[] = await client.fetch(query);

      // Selecting the first 4 as trending products
      const trending = allProducts.slice(0, 4);
      setProducts(trending);

      // Selecting the last 3 as exclusive products
      const exclusive = allProducts.slice(-3);
      setExclusiveProducts(exclusive);
    }
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white py-20">
      {/* Section Heading */}
      <h2 className="text-[#3F509E] text-3xl font-bold text-center mb-16">Trending Products</h2>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        {products.map((product) => (
          <div key={product._id} className="group relative">
            {/* Image with Gray Background */}
            <div className="bg-gray-200 flex justify-center items-center p-6 h-[280px] relative">
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain transition-all duration-300 group-hover:opacity-90"
                />
              )}
            </div>

            {/* Product Details */}
            <div className="mt-4 text-center">
              <h3 className="text-[#3F509E] font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-[#3F509E] font-bold inline-block">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Vouchers and Product List Section */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Voucher 1 */}
        <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
          <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
          <Link href={"/Shop"}>
            <button className="text-pink-600 underline text-lg font-medium">Shop Now</button>
          </Link>
          <Image
            src="/voucher1.png"
            alt="Voucher Image"
            width={180}
            height={180}
            className="absolute bottom-2 right-0 object-contain"
          />
        </div>

        {/* Voucher 2 */}
        <div className="bg-pink-100 p-8 flex flex-col justify-between relative h-[200px]">
          <h3 className="text-[#3F509E] text-2xl font-bold mb-4">23% Off in all products</h3>
          <Link href={"/Shop"}>
            <button className="text-pink-600 underline text-lg font-medium mt-4">
              View Collection
            </button>
          </Link>
          <Image
            src="/voucher2.png"
            alt="Voucher Image"
            width={200}
            height={200}
            className="absolute bottom-2 right-2 object-contain"
          />
        </div>

        {/* Exclusive Product List */}
        <div className="flex flex-col space-y-4">
          {exclusiveProducts.map((product) => (
            <div
              key={product._id}
              className="bg-gray-200 flex items-center p-4 h-[100px] rounded shadow"
            >
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="object-contain mr-4"
                />
              )}
              <div>
                <h3 className="text-[#3F509E] font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-[#3F509E] font-bold inline-block">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
