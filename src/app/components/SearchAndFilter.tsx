"use client";

import { useState, useEffect } from "react";
import { Product } from "../../type/Product";

interface SearchAndFilterProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

const SearchAndFilter = ({ products, setFilteredProducts }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let filtered = products;
    
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, category, products, setFilteredProducts]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* Filter Buttons */}
      <div className="flex space-x-4">
        {["All", "Chair", "Sofa"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${category === cat ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
