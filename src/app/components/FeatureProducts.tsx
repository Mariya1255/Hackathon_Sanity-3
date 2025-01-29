"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HeartIcon, ShoppingCartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/type/Product";
import { query } from "@/sanity/lib/query";
import { addtoCart } from "../../../action/action";
import Swal from "sweetalert2";

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response: Product[] = await client.fetch(query);
      const featuredProducts = response.slice(12, 16);
      setProducts(featuredProducts);
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
      addtoCart(product);}

  return (
    <div className="w-full bg-white py-20">
      {/* Heading */}
      <h2 className="text-black text-4xl text-center mb-16 font-bold">Featured Products</h2>

      {/* Product Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="relative group">
            {/* Product Image with Icons */}
            <div className="w-full bg-gray-200 flex justify-center items-center relative overflow-hidden h-[400px]">
              {/* Product Image */}
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  width={200}
                  height={250}
                  alt={product.name}
                  className="object-cover w-[200px] h-[250px] transition-all duration-300 group-hover:scale-105"
                />
              )}

              {/* Icons (Wishlist, View Details, and Zoom) */}
              <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Wishlist Icon */}
                <button className="bg-white p-2 rounded-full">
                  <HeartIcon className="w-6 h-6 text-gray-700" />
                </button>
                {/* Magnifying Glass Icon */}
                <button className="bg-white p-2 rounded-full">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
                </button>
                {/* Cart Icon */}
                <button onClick={(e) => handleAddToCart(e,product)} className="bg-white p-2 rounded-full">
                  <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-0 w-full text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full py-2 text-sm bg-[#08D15F] rounded-none hover:bg-green-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-red-500">{product.name}</h3>
              <div className="flex justify-center items-center gap-1 mt-1">
                <span className="text-[#05E6B7] text-4xl">-</span>
                <span className="text-[#F701A8] text-4xl">-</span>
                <span className="text-[#00009D] text-4xl">-</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Code - {product._id}</p>
              <p className="mt-1 text-dark-blue-900">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
