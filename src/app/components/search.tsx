"use client";
import React, { useEffect, useState } from 'react';
import { Product } from './../../type/Product';

interface SearchFilterProps {
    products: Product[];
    onFilter: (filteredProducts: Product[]) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchFilterProps> = ({ products, onFilter, searchQuery, setSearchQuery }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    const categories = Array.from(new Set(products.map((product) => product.category)));

    const handleFilter = () => {
        let filteredProducts = [...products];

        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product) => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter((product) => 
                product.category === selectedCategory
            );
        }

        if (priceRange) {
            filteredProducts = filteredProducts.filter((product) => 
                product.price >= priceRange[0] && product.price <= priceRange[1]
            );
        }

        onFilter(filteredProducts);
    };

    useEffect(() => {
        handleFilter();
    }, [searchQuery, selectedCategory, priceRange]);

    return (
        <div className='footer'>
            {/* Search Input */}
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />

            {/* Category Filter */}
            <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Price Range Filter */}
            <input 
                type="range" 
                min={0} 
                max={1000} 
                value={priceRange[0]} 
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} 
            />
            <input 
                type="range" 
                min={0} 
                max={1000} 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} 
            />
        </div>
    );
};

export default Search;