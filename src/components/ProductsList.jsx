import { Link } from "react-router-dom";

function ProductsList({ products, addToCart, cart }) {
  return (
    <section className="products-section">
      <div className="products-header">
        <h1>Featured Products</h1>
        <p>{products.length} product(s) found</p>
      </div>

      {products.length === 0 ? (
        <div className="no-products-box">
          <h2>No products found</h2>
          <p>Try changing your search or filter values.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const isAdded = cart.some((item) => item.id === product.id);

            return (
              <div className="product-card" key={product.id}>
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="product-image-box">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                  </div>

                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>

                    <p className="product-description">{product.description}</p>

                    <p className="extra-text">Free delivery | 7 days return</p>

                    <div className="product-bottom">
                      <h2 className="product-price">₹{product.price}</h2>
                      <span className="product-rating">
                        ⭐ {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>

                <button
                  className={`add-cart-btn ${isAdded ? "added-btn" : ""}`}
                  onClick={() => addToCart(product)}
                >
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ProductsList;