import { Link } from "react-router-dom";

function Wishlist({ wishlist, removeFromWishlist, addToCart, user }) {
  if (!user) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-login-box">
          <h2>Please login to view your wishlist</h2>
          <Link to="/login" className="wishlist-login-btn">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-layout">
        <aside className="wishlist-left">
          <div className="wishlist-user-card">
            <div className="wishlist-avatar">👤</div>
            <div>
              <p>Hello,</p>
              <h3>{user.name}</h3>
            </div>
          </div>

          <div className="wishlist-menu-box">
            <Link to="/orders">📦 My Orders</Link>
            <Link to="/profile">👤 Profile Information</Link>
            <Link to="/wishlist" className="active-wishlist-link">
              ❤️ My Wishlist
            </Link>
          </div>
        </aside>

        <main className="wishlist-main">
          <h2>My Wishlist ({wishlist.length})</h2>

          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <h3>Your wishlist is empty</h3>
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            wishlist.map((product) => (
              <div className="wishlist-item" key={product.id}>
                <Link to={`/product/${product.id}`} className="wishlist-img-box">
                  <img src={product.image} alt={product.title} />
                </Link>

                <div className="wishlist-info">
                  <h3>{product.title}</h3>
                  <p className="wishlist-assured">🛡 Assured</p>

                  <div className="wishlist-price-row">
                    <h2>₹{product.price}</h2>
                    <span className="wishlist-old-price">
                      ₹{Math.round(product.price * 1.4)}
                    </span>
                    <span className="wishlist-discount">20% off</span>
                  </div>

                  <button
                    className="wishlist-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>

                <button
                  className="wishlist-delete-btn"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default Wishlist;