import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalCartItems,
  search,
  setSearch,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="page-wrapper">
      <Navbar
        search={search}
        setSearch={setSearch}
        totalCartItems={totalCartItems}
      />

      <section className="cart-page">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <p>{totalCartItems} item(s) added</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-page">
            <h2>Your cart is empty</h2>
            <Link to="/" className="back-home-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <h4>₹{item.price}</h4>

                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <p className="cart-item-total">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Cart;