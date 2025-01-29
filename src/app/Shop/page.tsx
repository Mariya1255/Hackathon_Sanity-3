"use client";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '@/type/Product';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('All');

  useEffect(() => {
    async function fetchProducts() {
      const response: Product[] = await client.fetch('*[_type == "product"]');
      setProducts(response);
      setFilteredProducts(response);
    }
    fetchProducts();
  }, []);

  const handleFilter = (category: string) => {
    setCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="font-sans text-[#151875]">
      {/* Header Section */}
      <div className="py-28 px-8">
        <h1 className="text-4xl font-bold">Shop List</h1>
        <div className="flex items-center gap-2">
          <a href="/" className="text-gray-700 hover:underline">Home</a>
          <p>Pages</p>
          <p className="text-[#FB2E86]">Shopping List</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex justify-center space-x-4 py-6">
        <button
          onClick={() => handleFilter('All')}
          className={`px-4 py-2 rounded ${category === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilter('Chair')}
          className={`px-4 py-2 rounded ${category === 'Chair' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Chair
        </button>
        <button
          onClick={() => handleFilter('Sofa')}
          className={`px-4 py-2 rounded ${category === 'Sofa' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sofa
        </button>
      </div>

      {/* Product Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            
              <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    width={500}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                  <span className="text-lg font-bold">${product.price}</span>
                </div>
              </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
