import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import profileIcon from "../assets/profile.png";
import Sidebar from "../components/Sidebar";

function Home({
  products,
  search,
  setSearch,
  totalCartItems,
  addToCart,
  cart,
  selectedRating,
  setSelectedRating,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
  loading,
  error,
  user,
  handleLogout,
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  allProducts,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="page-wrapper home-page-new">
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
              <Link to="/profile" className="profile-icon-link">
                <img
                  src={profileIcon}
                  alt="Profile"
                  className="profile-icon"
                />
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

      <main className="home-content-layout">
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(true)}
        >
          ☰ Filters
        </button>

        <div className={`sidebar-wrapper ${showFilters ? "show-sidebar" : ""}`}>
          <div className="mobile-sidebar-header">
            <h3>Filters</h3>
            <button onClick={() => setShowFilters(false)}>✖</button>
          </div>

          <Sidebar
            products={allProducts}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            clearFilters={clearFilters}
          />
        </div>

        {showFilters && (
          <div
            className="filter-overlay"
            onClick={() => setShowFilters(false)}
          ></div>
        )}

        <section className="home-products-area">
          {loading ? (
            <div className="no-products-box">
              <h2>Loading products...</h2>
            </div>
          ) : error ? (
            <div className="no-products-box">
              <h2>{error}</h2>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products-box">
              <h2>No products found</h2>
              <p>Try changing your search or filter values.</p>
            </div>
          ) : (
            <div className="homepage-products-grid">
              {products.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id);
                const currentQtyInCart = cartItem ? cartItem.quantity : 0;
                const stock = Number(product.stock) || 0;
                const isOutOfStock = stock === 0;
                const isStockLimitReached =
                  currentQtyInCart >= stock && stock > 0;

                return (
                  <div className="homepage-product-card" key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      className="homepage-product-link"
                    >
                      <div className="homepage-product-image-box">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="homepage-product-image"
                        />
                      </div>

                      <div className="homepage-product-content">
                        <h3>{product.title}</h3>

                        <p className="homepage-product-description">
                          {product.description}
                        </p>

                        <p className="homepage-extra-text">
                          Free delivery | 7 days return
                        </p>

                        <p
                          className={`homepage-stock-text ${
                            isOutOfStock ? "out-of-stock-text" : ""
                          }`}
                        >
                          {isOutOfStock ? "Not available" : `Stock: ${stock}`}
                        </p>

                        <p className="homepage-rating-text">
                          ⭐ {product.rating.toFixed(1)}
                        </p>
                      </div>
                    </Link>

                    <div className="price-cart-row">
                      <h2 className="homepage-price">₹{product.price}</h2>

                      <button
                        className={`homepage-add-cart-btn ${
                          isOutOfStock || isStockLimitReached
                            ? "disabled-cart-btn"
                            : ""
                        }`}
                        onClick={() => addToCart(product)}
                        disabled={isOutOfStock || isStockLimitReached}
                      >
                        {isOutOfStock
                          ? "Not available"
                          : isStockLimitReached
                          ? "Max added"
                          : "Add"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;