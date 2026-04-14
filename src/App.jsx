import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import productsData from "./products";

function App() {
  const [search, setSearch] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cart, setCart] = useState([]);

  const normalizedProducts = useMemo(() => {
    return productsData.map((product) => ({
      ...product,
      image:
        product.thumbnail ||
        product.image ||
        product.images?.[0] ||
        "https://via.placeholder.com/300x220?text=Product",
      rating: Number(product.rating) || 0,
      price: Number(product.price) || 0,
      description:
        product.description || "High quality product with premium finish.",
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    return normalizedProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRating =
        selectedRating === 0 || product.rating >= selectedRating;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return matchesSearch && matchesRating && matchesMinPrice && matchesMaxPrice;
    });
  }, [normalizedProducts, search, selectedRating, minPrice, maxPrice]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            products={filteredProducts}
            search={search}
            setSearch={setSearch}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            addToCart={addToCart}
            cart={cart}
            totalCartItems={totalCartItems}
          />
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProductDetails
            products={normalizedProducts}
            addToCart={addToCart}
            cart={cart}
            totalCartItems={totalCartItems}
            search={search}
            setSearch={setSearch}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
            totalCartItems={totalCartItems}
            search={search}
            setSearch={setSearch}
          />
        }
      />
    </Routes>
  );
}

export default App;