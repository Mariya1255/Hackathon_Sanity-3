"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HeartIcon, ShoppingCartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { Product } from "../../type/Product";
import { query } from '../../sanity/lib/query';

import Swal from "sweetalert2";
import { addtoCart } from "../../../action/action";

const LatestProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response: Product[] = await client.fetch(query);
      const latestProducts = response.slice(5, 11);
      setProducts(latestProducts);
    }
    fetchProducts();
  }, []);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault()
    Swal.fire({
      position : "top-end",
      icon : "success",
      title : `${product.name} added to cart`,
      showConfirmButton : false,
      timer : 1500
    })
    addtoCart(product);
  }

  return (
    <div className="w-full bg-white py-20">
      {/* Heading */}
      <h2 className="text-[#3F509E] text-4xl text-center font-bold mb-8">Latest Products</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-8 mb-16">
        {["New Arrival", "Best Seller", "Featured", "Special Offers"].map((tab) => (
          <button
            key={tab}
            className="text-[#3F509E] text-lg font-medium relative group hover:text-[#FB2E86]"
          >
            {tab}
            {/* Underline */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FB2E86] transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="relative group">
            {/* Product Image */}
            <div className="w-full bg-gray-200 flex justify-center items-center relative overflow-hidden h-[300px] transition-all duration-300 group-hover:bg-white">
              {/* Sale Tag */}
              {product.discountPercentage && (
                <span className="absolute top-2 left-2 bg-[#3F509E] text-white text-sm px-3 py-1 rounded">
                  Sale
                </span>
              )}
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  width={200}
                  height={200}
                  alt={product.name}
                  className="object-contain"
                />
              )}

              {/* Icons */}
              <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white p-2 rounded-full shadow">
                  <HeartIcon className="w-6 h-6 text-[#3F509E]" />
                </button>
                <button className="bg-white p-2 rounded-full shadow">
                  <MagnifyingGlassIcon className="w-6 h-6 text-[#3F509E]" />
                </button>
                <button onClick={(e) => handleAddToCart(e, product)} className="bg-white p-2 rounded-full shadow">
                  <ShoppingCartIcon className="w-6 h-6 text-[#3F509E]" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-[#3F509E]">{product.name}</h3>
              <div className="mt-2 text-gray-600 flex justify-center items-center gap-2">
                {product.discountPercentage ? (
                  <>
                    <span className="text-red-600 font-medium line-through">
                      ${((product.price * 100) / (100 - product.discountPercentage)).toFixed(2)}
                    </span>
                    <span className="text-gray-800">${product.price}</span>
                  </>
                ) : (
                  <span className="text-gray-800">${product.price}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
