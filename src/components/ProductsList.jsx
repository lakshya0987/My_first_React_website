import { Link } from "react-router-dom";

const ProductsList = ({ products, addToCart }) => {
  return (
    <div className="products-section">
      <div className="products-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-box">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>₹{product.price}</p>
                </div>
              </Link>

              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </div>
    </div>
  );
};

export default ProductsList;