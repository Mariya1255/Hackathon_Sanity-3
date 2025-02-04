"use client";
import { client } from '../../sanity/lib/client';
import { Product } from '../../type/Product';
import { useState, useEffect } from 'react';
import ProductListing from '../components/ProductListing';

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
        {['All', 'Chair', 'Sofa'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List with Pagination */}
      <ProductListing products={filteredProducts} />
    </div>
  );
};

export default ShopPage;
