import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  const cartKey = user
    ? `luxecartCart_${user.email}`
    : "luxecartCart_guest";

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(savedCart);
  }, [cartKey]);

  const getProductId = (product) => {
    return String(product._id || product.id);
  };

  const saveCart = (items) => {
    setCart(items);
    localStorage.setItem(cartKey, JSON.stringify(items));
  };

  const addToCart = (product) => {
    const productId = getProductId(product);

    const exist = cart.find((item) => getProductId(item) === productId);

    if (exist) {
      const updatedCart = cart.map((item) =>
        getProductId(item) === productId
          ? { ...item, quantity: Number(item.quantity) + 1 }
          : item
      );

      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (product) => {
    const productId = typeof product === "object" ? getProductId(product) : String(product);

    const exist = cart.find((item) => getProductId(item) === productId);

    if (!exist) return;

    if (Number(exist.quantity) <= 1) {
      const updatedCart = cart.filter((item) => getProductId(item) !== productId);
      saveCart(updatedCart);
    } else {
      const updatedCart = cart.map((item) =>
        getProductId(item) === productId
          ? { ...item, quantity: Number(item.quantity) - 1 }
          : item
      );

      saveCart(updatedCart);
    }
  };

  const removeFromCart = (product) => {
    const productId = typeof product === "object" ? getProductId(product) : String(product);

    const updatedCart = cart.filter((item) => getProductId(item) !== productId);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);