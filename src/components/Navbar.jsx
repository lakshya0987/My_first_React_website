import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ search, setSearch, totalCartItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <header className="navbar">
      <div className="nav-logo">
        <Link to="/">Canva</Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <a href="#footer">About</a>
        <a href="#footer">Contact</a>
        <a href="#footer">Address</a>
      </nav>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
        />
        <span className="search-icon">🔍</span>
      </div>

      <Link to="/cart" className="cart-link">
        <span className="cart-icon">🛒</span>
        {totalCartItems > 0 && (
          <span className="cart-badge">{totalCartItems}</span>
        )}
      </Link>
    </header>
  );
}

export default Navbar;