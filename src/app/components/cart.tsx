import { Product } from '@/type/Product';
import React, { useState, useEffect } from 'react';
import { getCart, updateCartQuantity } from '../../../action/action';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Swal from 'sweetalert2';

const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${product.name} removed from cart`,
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(getCart());
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    });
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCart(getCart());
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.stockLevel, 0);
  };

  const handleProceedToCheckout = () => {
    Swal.fire({
      title: 'Proceed to Checkout',
      text: `Total: $${calculateTotal() + 15}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Order Placed', 'Your order has been placed', 'success');
      }
    });
  };

  return (
    <div className="p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-[#1D3178]">Your Cart</h2>
        {cart.length > 0 ? (
          <div className="space-y-6">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  <p className="font-semibold text-[#1D3178]">{product.name}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <p className="text-[#1D3178]">${product.price.toFixed(2)}</p>
                  <input
                    type="number"
                    value={product.stockLevel}
                    onChange={(e) =>
                      handleUpdateCartQuantity(product._id, Number(e.target.value))
                    }
                    className="w-12 px-2 py-1 border rounded-md text-center"
                    min="1"
                  />
                  <p className="font-bold text-[#1D3178]">
                    ${(product.price * product.stockLevel).toFixed(2)}
                  </p>
                  <button
                    onClick={(e) => handleRemoveFromCart(e, product)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#1D3178] text-center mt-6">Your cart is empty. Add some products!</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCart(getCart())}
            className="px-4 py-2 bg-[#FB2E86] text-white rounded-md text-sm hover:bg-pink-600"
          >
            Update Cart
          </button>
          <button
            onClick={() => setCart([])}
            className="px-4 py-2 bg-[#FB2E86] text-white rounded-md text-sm hover:bg-pink-600"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Cart Totals */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-[#1D3178]">Cart Totals</h2>
        <p className="flex justify-between text-[#1D3178]">
          <span>Subtotal:</span> <span>${calculateTotal().toFixed(2)}</span>
        </p>
        <p className="flex justify-between mb-4 text-[#1D3178]">
          <span>Shipping:</span> <span>$15.00</span>
        </p>
        <p className="flex justify-between font-bold text-lg text-[#1D3178]">
          <span>Total:</span> <span>${(calculateTotal() + 15).toFixed(2)}</span>
        </p>
        <button
          onClick={handleProceedToCheckout}
          className="w-full py-3 bg-[#FB2E86] text-white rounded-md font-semibold hover:bg-pink-600"
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
