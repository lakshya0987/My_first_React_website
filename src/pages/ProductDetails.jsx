import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import Footer from "../components/Footer";

function ProductDetails({
  products,
  addToCart,
  totalCartItems,
  search,
  setSearch,
  loading,
  error,
  user,
  handleLogout,
}) {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  const product = products.find((item) => String(item.id) === String(id));

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products.filter((item) => item.id !== product.id).slice(0, 4);
  }, [products, product]);

  const renderHeader = () => (
    <header className="custom-home-navbar">
      <div className="home-logo-box">
        <h2>Canva</h2>
      </div>

      <nav className="home-nav-links">
        <Link to="/">Home</Link>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#address">Address</a>
      </nav>

      <div className="home-search-cart">
        <div className="home-search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {user ? (
          <>
            <Link to="/profile" className="home-profile-btn">
              Profile
            </Link>
            <span className="home-user-text">Hi, {user.name}</span>
            <button className="home-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="home-login-btn">
            Login
          </Link>
        )}

        <Link to="/cart" className="home-cart-icon">
          🛒
          {totalCartItems > 0 && (
            <span className="cart-count-badge">{totalCartItems}</span>
          )}
        </Link>
      </div>
    </header>
  );

  if (loading) {
    return (
      <div className="page-wrapper">
        {renderHeader()}
        <div className="not-found-box">
          <h2>Loading product...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        {renderHeader()}
        <div className="not-found-box">
          <h2>{error}</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-wrapper">
        {renderHeader()}
        <div className="not-found-box">
          <h2>Product not found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const reviews = product.reviews || [];

  const renderStars = (rating) => {
    const fullStars = Math.round(Number(rating) || 0);

    return (
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= fullStars ? "filled-star" : "empty-star"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="page-wrapper">
      {renderHeader()}

      <section className="single-product-page">
        <div className="single-product-layout">
          <div className="single-gallery">
            <div className="single-gallery-thumbs">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  className={`single-thumb-btn ${
                    selectedImage === index ? "single-thumb-active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="single-gallery-main">
              <span className="cart-badge-red">
                {Math.round(product.discountPercentage || 0)}% OFF
              </span>

              <img src={gallery[selectedImage]} alt={product.title} />
            </div>
          </div>

          <div className="single-product-info">
            <h1>{product.title}</h1>

            <div className="single-seller-row">
              <div className="single-seller-logo">
                {product.brand ? product.brand.charAt(0) : "B"}
              </div>

              <div className="single-seller-text">
                <div className="single-seller-name">
                  {product.brand || "Brand Store"} <span>Official Seller</span>
                </div>

                <div className="single-seller-links">
                  <span>{product.category}</span>
                </div>
              </div>
            </div>

            <div className="single-price-box">
              <h2>₹{product.price}</h2>

              {product.discountPercentage ? (
                <p className="coupon-text">
                  Save {product.discountPercentage}% on this item
                </p>
              ) : null}
            </div>

            <div className="single-condition-row">
              <span className="label-text">Rating:</span>
              <span className="value-text">
                {product.rating?.toFixed(1)} ⭐
              </span>
            </div>

            <div className="single-condition-row">
              <span className="label-text">Category:</span>
              <span className="value-text">{product.category}</span>
            </div>

            <div className="single-condition-row">
              <span className="label-text">Brand:</span>
              <span className="value-text">{product.brand || "N/A"}</span>
            </div>

            <div className="single-size-box">
              <label>Description</label>
              <select disabled>
                <option>{product.description}</option>
              </select>
            </div>

            <div className="single-qty-row">
              <span className="label-text">Qty:</span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              />
              <span className="qty-stock-text">
                Stock: {product.stock ?? "Available"}
              </span>
            </div>

            <div className="single-product-buttons">
              <button className="single-buy-btn" onClick={handleAddToCart}>
                Buy Now
              </button>

              <button
                className="single-add-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button className="single-watchlist-btn">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {similarProducts.length > 0 && (
        <section className="related-section">
          <div className="related-heading">
            <h2>Similar Products</h2>
          </div>

          <div className="related-row">
            {similarProducts.map((item) => (
              <div className="related-card" key={item.id}>
                <Link
                  to={`/product/${item.id}`}
                  className="homepage-product-link"
                >
                  <div className="related-img-box">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>
                  <h3>₹{item.price}</h3>
                  <span>⭐ {item.rating.toFixed(1)}</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="product-reviews-section">
        <div className="product-reviews-header">
          <h2>Customer Reviews</h2>
        </div>

        {reviews.length === 0 ? (
          <div className="no-reviews-box">
            <p>No reviews available for this product.</p>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="review-user-row">
                  <div className="review-avatar">
                    {(review.reviewerName || review.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="review-user-info">
                    <h4>{review.reviewerName || review.name || "Customer"}</h4>
                  </div>
                </div>

                <div className="review-rating-title">
                  {renderStars(review.rating)}

                  <h3>
                    {review.title || "Good product"}
                  </h3>
                </div>

                <p className="review-date">
                  Reviewed on{" "}
                  {review.date ||
                    review.reviewDate ||
                    "Recently"}
                </p>

                <p className="review-text">
                  {review.comment || review.review || review.description}
                </p>

                <div className="review-actions">
                  <button type="button">Helpful</button>
                  <span>Report</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;