"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  id: number;
  title: string;
  code: string;
  price: number;
  image: string;
  salePrice?: number;
}

const ProductCarouselWithWishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const sampleProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      code: "P001",
      price: 100,
      image: "/product1.png",
    },
    {
      id: 2,
      title: "Product 2",
      code: "P002",
      price: 150,
      salePrice: 120,
      image: "/product2.png",
    },
    {
      id: 3,
      title: "Product 3",
      code: "P003",
      price: 200,
      image: "/product3.png",
    },
  ];

  const handleWishlistAdd = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        alert("Product already in Wishlist!");
        return prev;
      }
      return [...prev, product];
    });
  };

  return (
    <div className="py-10">
      {/* Carousel Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {sampleProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="p-4 border rounded-lg shadow-md text-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500">Code: {product.code}</p>
                <p className="text-lg font-bold text-green-500">
                  ${product.salePrice ?? product.price}
                </p>
                {product.salePrice && (
                  <p className="text-sm text-red-500 line-through">
                    ${product.price}
                  </p>
                )}
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleWishlistAdd(product)}
                >
                  Add to Wishlist
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Wishlist Section */}
      <section className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul className="space-y-2">
            {wishlist.map((item) => (
              <li
                key={item.id}
                className="p-4 border rounded-md bg-white flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">Code: {item.code}</p>
                </div>
                <p className="text-lg font-bold text-green-500">
                  ${item.salePrice ?? item.price}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your Wishlist is empty.</p>
        )}
      </section>
    </div>
  );
};

export default ProductCarouselWithWishlist;
