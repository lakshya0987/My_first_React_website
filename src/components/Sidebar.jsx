function Sidebar({
  selectedRating,
  setSelectedRating,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  const ideas = [
    "Philips",
    "All-in-one",
    "Professional",
    "Waterproof",
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h2>Popular Shopping Ideas</h2>
        <ul className="ideas-list">
          {ideas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h2>Customer Reviews</h2>
        <div className="rating-options">
          {[4, 3, 2, 1].map((star) => (
            <button
              key={star}
              className={`rating-filter-btn ${
                selectedRating === star ? "active-rating" : ""
              }`}
              onClick={() => setSelectedRating(star)}
            >
              {"★".repeat(star)}
              {"☆".repeat(5 - star)} & Up
            </button>
          ))}

          <button
            className="clear-filter-btn"
            onClick={() => setSelectedRating(0)}
          >
            Clear Rating Filter
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <h2>Price</h2>
        <p className="price-range-text">₹0 - ₹Any</p>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="price-input"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="price-input"
        />

        <button
          className="clear-filter-btn"
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
        >
          Clear Price Filter
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;