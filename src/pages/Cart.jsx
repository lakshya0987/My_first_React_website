import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, increaseQuantity, decreaseQuantity, totalPrice }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Continue Shopping
      </button>

      <h2 className="cart-title">My Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some products to see them here.</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>

                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-price">₹{item.price}</p>
                  <p className="cart-subtotal">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </div>

                <div className="cart-actions">
                  <div className="cart-quantity-box">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <span className="qty-number">{item.quantity}</span>

                    <button
                      className="qty-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total Items: {cart.reduce((a, b) => a + b.quantity, 0)}</p>
            <p className="summary-total">Total Price: ₹{totalPrice}</p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;