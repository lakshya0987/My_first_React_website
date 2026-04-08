import { Link } from "react-router-dom";

function ProductsList({ products }) {
  return (
    <div className="products-section">
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-link"
            >
              <div className="product-card">
                <div className="product-image-box">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <h3 className="product-title-list">{product.title}</h3>
                  <p className="product-price">₹{product.price}</p>
                  <span className="rating">⭐ {product.rating}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-products-box">
            <h2>No products found in this price range</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;