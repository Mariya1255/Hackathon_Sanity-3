"use client";
import React, { useEffect, useState } from "react";
import {
  getCart,
  handleRemoveFromCart,
  updateCartQuantity,
  calculateTotal,
  clearCart,
} from "../../../action/action";
import { Product } from "../../type/Product";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";


const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemoveClick = (productId: string) => {
    handleRemoveFromCart(productId, setCart);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateCartQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    clearCart(setCart);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((product) => (
              <li key={product._id} className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />)}
                  <div>
                    <h2 className="text-lg font-medium">{product.name}</h2>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={product.stockLevel}
                    onChange={(e) =>
                      handleQuantityChange(product._id, parseInt(e.target.value, 10))
                    }
                    className="w-16 text-center border rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveClick(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-lg font-medium">
              Total: ${calculateTotal(cart).toFixed(2)}
            </h3>
            <button
              onClick={handleClearCart}
              className="px-6 py-2 bg-red-600 text-white rounded-md mt-4 hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
