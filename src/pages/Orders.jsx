import { Link, Navigate } from "react-router-dom";

function Orders({ user, orders }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-top-row">
          <h1>My Orders</h1>
          <Link to="/" className="orders-back-btn">
            Back to Home
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty-box">
            <h2>No orders yet</h2>
            <p>Your placed orders will appear here.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-card-header">
                  <div>
                    <h3>Order ID: {order.id}</h3>
                    <p>Placed on: {order.date}</p>
                  </div>

                  <h2>₹{order.totalAmount.toFixed(2)}</h2>
                </div>

                <div className="order-items-list">
                  {order.items.map((item) => (
                    <div className="order-item" key={`${order.id}-${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="order-item-img"
                      />

                      <div className="order-item-info">
                        <h4>{item.title}</h4>
                        <p>Price: ₹{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;