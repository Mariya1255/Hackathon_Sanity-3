'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Ensure this path is correct
import { Product } from '@/type/Product'; // Ensure this path is correct
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';


function TopCategories() {
  const [categories, setCategories] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch categories from Sanity
    const fetchCategories = async () => {
      const query = `
        *[_type == "product"] {
          _id,
          "img": image.asset->url,
          name,
          price
        }
      `;
      const data = await client.fetch(query);
      const categories = data.slice(17, 21 );
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-white py-20">
      {/* Heading */}
      <h2 className="text-center text-[#3F509E] text-3xl font-bold mb-12">Top Categories</h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        {categories.map((product) => (
          <div key={product._id} className="relative group flex flex-col items-center">
            {/* Circle Image with Hover Effect */}
            <div className="w-[150px] h-[150px] flex justify-center items-center bg-gray-200 rounded-full relative overflow-hidden">
              {product.image && (
                              <Image
                                src={urlFor(product.image).url()}
                                width={120}
                                height={120}
                                alt={product.name}
                                className="object-contain"
                              />
                            )}

              {/* Hover Blue Circle Outline */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#3F509E] transition-all duration-300"></div>

              {/* Hover View Shop Button */}
              <Link href={'/Shop'}><button className="absolute bottom-2 bg-[#08D15F] text-white px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" >
              
                View Shop
              </button> </Link>
            </div>

            {/* Category Name and Price */}
            <h3 className="text-[#3F509E] font-bold mt-4">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Pink Dots */}
      <div className="flex justify-center mt-4">
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
        <span className="w-3 h-3 bg-pink-600 rounded-full mx-1"></span>
      </div>
    </div>
  );
}

export default TopCategories;
