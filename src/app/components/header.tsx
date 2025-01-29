'use client';
 import { IoSearch } from "react-icons/io5";
 import Link from "next/link";
import { FaEnvelope, FaPhoneAlt, FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa'; // Import necessary icons
import { useState } from 'react'; // To manage dropdown state

const TopBar = () => {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  return (
    <div className="bg-violet-700 text-white py-2 text-sm flex items-center justify-center">
      {/* TopBar Container */}
      <div className="w-full max-w-[1200px] flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center justify-center gap-6 w-full sm:w-auto">
          {/* Email */}
          <a
            href="mailto:mhhasanul@gmail.com"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaEnvelope />
            <span>mhhasanul@gmail.com</span>
          </a>
          {/* Phone */}
          <a
            href="tel:1234567890"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaPhoneAlt />
            <span>(12345)67890</span>
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center gap-6 w-full sm:w-auto">
          {/* Language Selector */}
          <div
            className="relative cursor-pointer flex items-center gap-1"
            onMouseEnter={() => setLanguageDropdown(true)}
            onMouseLeave={() => setLanguageDropdown(false)}
          >
            <span>English</span>
            <span className="text-xs">▼</span>
            {languageDropdown && (
              <div className="absolute top-8 bg-white text-black rounded shadow-md p-2">
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">English</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">Spanish</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">French</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">German</div>
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div
            className="relative cursor-pointer flex items-center gap-1"
            onMouseEnter={() => setCurrencyDropdown(true)}
            onMouseLeave={() => setCurrencyDropdown(false)}
          >
            <span>USD</span>
            <span className="text-xs">▼</span>
            {currencyDropdown && (
              <div className="absolute top-8 bg-white text-black rounded shadow-md p-2">
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">USD</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">EUR</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">GBP</div>
              </div>
            )}
          </div>

          {/* Login */}
          <a href="/Account" className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaUser />
            <span>Login</span>
          </a>

          {/* Wishlist */}
          <a href="/Wishlist" className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
            <FaHeart />
            <span>Wishlist</span>
          </a>

          {/* Cart */}
          <a href="/Cart" className="cursor-pointer hover:text-gray-200">
            <FaShoppingCart />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;


// Header
export const Header = () => {
    return (
        <div className='flex flex-col md:flex-row w-full   md:w-[1170px] mt-[30px] px-4 md:px-16 items-center max-w-screen-xl mx-auto  '>
            <h2 className='font-bold mr-16  font-inter text-[#000000] text-center md:text-left  text-3xl md:text-[24px]  md:w-auto'>
                Hekto
            </h2>
            
            <ul className='flex flex-col md:flex-row w-full md:w-auto justify-center md:justify-between gap-4 md:gap-[48px] text-[#000000]'>
                <Link href={"/"} className='font-poppins text-[16px] text-[#FB2E86] font-bold text-center md:text-left w-[48px] h-[24px] '>
                <select name='' id='' className='  text-center mr-10 '>
                <option value=""> Home</option>
            </select>
                </Link>
                <Link href={"/"} className='font-poppins text-[16px] font-bold text-center md:text-left w-[66px] h-[24px] '>Pages</Link>
                <Link href={"/"} className='font-poppins text-[16px] font-bold text-center md:text-left w-[48px] h-[24px] '>Product</Link>
                <Link href={"/"} className='font-poppins text-[16px] font-bold text-center md:text-left w-[61px] h-[24px] '>Blog</Link>
                <Link href={"/"} className='font-poppins text-[16px] font-bold text-center md:text-left w-[61px] h-[24px] '>Shop</Link>
                <Link href={"/"} className='font-poppins text-[16px] font-bold text-center md:text-left w-[61px] h-[24px] '>Contact</Link>

            </ul>

            <div className='flex gap-3 mt-4 md:mt-0'>
                <button className='flex items-center w-full ml-14 mr-11 md:w-[180px] h-[38px] rounded-[4px] pl-[20px] pt-[7px] pb-[7px] pr-[12px] gap-[7px] bg-white'>
                    <input 
                        type='text' 
                        className='font-poppins text-[13px] font-normal w-[130px] h-[18px] opacity-[50%] border-2 border-red-500 text-[#000000]' />
                    <IoSearch className='w-[20px] h-[16px]' />
                </button>
                
               
            </div>
        </div>
    )
}