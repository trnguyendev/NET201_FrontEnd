import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Lấy giỏ hàng từ LocalStorage khi khởi động, nếu không có thì mảng rỗng
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Mỗi khi cartItems thay đổi, lưu lại vào LocalStorage
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // HÀM: THÊM VÀO GIỎ HÀNG
  const addToCart = (product, variant, quantity) => {
    setCartItems(prevItems => {
      // Tìm xem mặt hàng này (Cùng Product ID, Cùng Màu, Cùng Size) đã có trong giỏ chưa?
      const existingItemIndex = prevItems.findIndex(item => item.productId === product.id && item.colorId === variant.colorId && item.sizeId === variant.sizeId);

      if (existingItemIndex >= 0) {
        // Nếu ĐÃ CÓ: Chỉ tăng số lượng
        const updatedItems = [...prevItems];
        // Đảm bảo không vượt quá kho
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        updatedItems[existingItemIndex].quantity = newQuantity > variant.quantity ? variant.quantity : newQuantity;
        return updatedItems;
      } else {
        // Nếu CHƯA CÓ: Thêm dòng mới vào giỏ hàng
        return [
          ...prevItems,
          {
            productId: product.id,
            name: product.name,
            thumbnail: product.thumbnail,
            price: product.basePrice, // Tương lai nếu có giá khuyến mãi thì lấy giá khuyến mãi
            colorId: variant.colorId,
            colorName: variant.colorName,
            sizeId: variant.sizeId,
            sizeName: variant.sizeName,
            quantity: quantity,
            maxStock: variant.quantity // Lưu lại tồn kho để check khi tăng giảm
          }
        ];
      }
    });
  };

  // HÀM: XÓA KHỎI GIỎ
  const removeFromCart = (productId, colorId, sizeId) => {
    setCartItems(prev => prev.filter(item => !(item.productId === productId && item.colorId === colorId && item.sizeId === sizeId)));
  };

  // HÀM: XÓA SẠCH GIỎ HÀNG (Dùng sau khi thanh toán xong)
  const clearCart = () => setCartItems([]);

  // TÍNH TỔNG TIỀN VÀ TỔNG SỐ LƯỢNG MÓN
  const cartTotalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotalAmount,
        cartTotalItems
      }}>
      {children}
    </CartContext.Provider>
  );
};
