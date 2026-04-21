import { Link } from "react-router-dom";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  placeOrder,
}) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">My Cart</h1>

        <div className="cart-empty-box">
          <h2>Your cart is empty</h2>
          <p>Add some products to continue shopping.</p>

          <Link to="/" className="cart-back-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">My Cart</h1>

      <div className="cart-layout">
        <div className="cart-left">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-img" />

              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <h4>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</h4>

                <div className="cart-qty-row">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-cart-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-right">
          <h2>Order Summary</h2>

          <div className="cart-summary-row">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="cart-summary-row">
            <span>Total Price</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={placeOrder}>
            Checkout
          </button>

          <Link to="/" className="cart-back-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;