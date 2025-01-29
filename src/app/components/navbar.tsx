"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { client } from '../../sanity/lib/client'; 
import { urlFor } from '../../sanity/lib/image'; 
import { Product } from '../../type/Product'; 
import Image from 'next/image';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Toggle Mobile Navbar
  const toggle = () => {
    setOpen(!open);
  };

  // Fetch and Filter Products Based on Search Query
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      
      const query = `[_type == "product" && name match "${searchQuery}"] {
        _id, name, price, image, slug
      }`;
      
      const results = await client.fetch(query);
      setSearchResults(results);
    };

    fetchProducts();
  }, [searchQuery]);

  // Close Search Results When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className='border-b-2 bg-neutral-100'>
      <div className='w-full flex items-center justify-center bg-white h-[85px]'>
        <div className='sm:w-full md:w-[80%] flex items-center justify-between h-full px-4'>
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href={'/'}>
              <h2 className="title-font font-extrabold text-blue-950 tracking-widest text-[34px] mb-0">
                Hekto
              </h2>
            </Link>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden sm:flex items-center gap-x-8">
            <ul className="flex gap-x-8 items-center">
              <li><Link className="hover:text-[#FB2E86] transition-colors" href="/">Home</Link></li>
              <li className="relative">
                <button className="hover:text-[#FB2E86] transition-colors" onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}>
                  Pages
                </button>
                {isPagesDropdownOpen && (
                  <ul className="absolute top-full mt-2 bg-white shadow-md rounded-md text-black text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/Cart">Cart</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/Checkout">Billing Details</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/Ordercompleted">Order Completed</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/About">About Us</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/Contact">Contact Us</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/Account">My Account</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/Creatorpage">About Creator</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100"><Link href="/Faq">FAQ</Link></li>
                  </ul>
                )}
              </li>
              <li><Link className="hover:text-[#FB2E86] transition-colors" href="/Blog">Blog</Link></li>
              <li><Link className="hover:text-[#FB2E86] transition-colors" href="/Shop">Shop</Link></li>
              <li><Link className="hover:text-[#FB2E86] transition-colors" href="/Contact">Contact</Link></li>
            </ul>
          </div>

          {/* Right Section */}
          <div className='flex gap-x-4 items-center'>
            <div className='hidden lg:flex w-full max-w-xs bg-gray-200 items-center relative'>
              <input
                className='w-90 p-2 bg-white border border-gray-200 text-[20px] rounded-l-md'
                type="search"
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} className="text-xl h-[36px] bg-pink-600 px-2 py-2 text-white rounded-r-md" />
              {searchResults.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-md text-black mt-2 z-50">
                  {searchResults.map((product) => (
                    <li key={product._id} className="flex items-center p-2 hover:bg-gray-100">
                      {product.image && (

                        <Image
                          src={urlFor(product.image).url()}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md mr-2"
                          width={150}
                          height={150}
                        />
                      )}
                      <Link href={`/product/${product.slug.current}`} className="text-sm">
                        {product.name} - ${product.price}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="text-black block md:hidden text-3xl z-50" onClick={toggle}>☰</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Navbar;
