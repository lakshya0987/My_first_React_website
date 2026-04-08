import { useParams, Link } from "react-router-dom";
import products from "../products";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return <h2 className="error-text">Product not found</h2>;
  }

  return (
    <>
      <div className="details-wrapper">
        <div className="details-container">
          <div className="left-section">
            <div className="main-image-box">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="main-image"
              />
            </div>
          </div>

          <div className="right-section">
            <p className="product-category">{product.category}</p>
            <h1 className="product-title-details">{product.title}</h1>

            <div className="rating-row">
              <span className="rating">⭐ {product.rating}</span>
              <span className="review-text">Product Rating</span>
            </div>

            <div className="price-row">
              <span className="new-price">₹{product.price}</span>
            </div>

            <p className="product-description">{product.description}</p>

            <Link to="/" className="back-btn">
              Back to Products
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;