import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductDetails({
  products,
  addToCart,
  totalCartItems,
  search,
  setSearch,
}) {
  const { id } = useParams();

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="page-wrapper">
        <Navbar
          search={search}
          setSearch={setSearch}
          totalCartItems={totalCartItems}
        />
        <div className="empty-page">
          <h2>Product not found</h2>
          <Link to="/" className="back-home-btn">
            Go Back Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar
        search={search}
        setSearch={setSearch}
        totalCartItems={totalCartItems}
      />

      <section className="details-page">
        <div className="details-container">
          <div className="details-image-box">
            <img
              src={product.image}
              alt={product.title}
              className="details-image"
            />
          </div>

          <div className="details-content">
            <p className="details-category">
              {product.category || "Electronics"}
            </p>

            <h1 className="details-title">{product.title}</h1>

            <div className="details-rating-row">
              <span className="rating-badge">⭐ {product.rating.toFixed(1)}</span>
              <span className="stock-text">
                {product.stock ? `${product.stock} in stock` : "In stock"}
              </span>
            </div>

            <p className="details-price">₹{product.price}</p>

            <p className="details-description">{product.description}</p>

            <div className="details-feature-list">
              <p>✔ Premium quality finish</p>
              <p>✔ Fast delivery available</p>
              <p>✔ 7 days return policy</p>
              <p>✔ Secure checkout experience</p>
            </div>

            <div className="details-buttons">
              <button
                className="details-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

              <Link to="/cart" className="details-view-cart-btn">
                View Cart
              </Link>
            </div>

            <Link to="/" className="back-home-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;