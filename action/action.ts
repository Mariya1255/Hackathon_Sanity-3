import { Product } from "@/type/Product";
import Swal from "sweetalert2";

export const addtoCart = (product: Product) => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingProduct = cart.findIndex((item) => item._id === product._id);
  if (existingProduct !== -1) {
    cart[existingProduct].stockLevel += 1;
  } else {
    cart.push({
      ...product,
      stockLevel: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const handleRemoveFromCart = (
  productId: string,
  setCart: (cart: Product[]) => void
) => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  setCart(updatedCart); // Update the cart state in the component
};

export const updateCartQuantity = (id: string, quantity: number) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = cart.map((item: Product) =>
    item._id === id ? { ...item, stockLevel: quantity } : item
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const getCart = (): Product[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const clearCart = (setCart: (cart: Product[]) => void) => {
  localStorage.removeItem("cart");
  setCart([]); // Clear the cart state in the component
};

export const calculateTotal = (cart: Product[]): number => {
  return cart.reduce((total, item) => total + item.price * item.stockLevel, 0);
};

export const proceedToCheckout = (cart: Product[]): number => {
  return cart.reduce((total, item) => total + item.price * item.stockLevel, 0) + 15;
};

export const handleProceedToCheckout = (cart: Product[]) => {
  Swal.fire({
    title: "Proceed to Checkout",
    text: `Total: $${proceedToCheckout(cart)}`,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Proceed",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Order Placed", "Your order has been placed", "success");
    }
  });
};
