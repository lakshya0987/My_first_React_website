import React from "react";
import { useParams } from "react-router-dom";
import products from "../products";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="product-details-info">
        <h1>{product.title}</h1>
        <p className="price">₹{product.price}</p>
        <p className="rating">⭐ {product.rating}</p>
        <p className="description">{product.description}</p>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;