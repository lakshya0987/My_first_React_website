function Sidebar({
  className,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
}) {
  const showRangeText =
    minPrice !== "" || maxPrice !== ""
      ? `₹${minPrice || 0} - ₹${maxPrice || "Any"}`
      : "₹0 - ₹Any";

  const invalidRange =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(minPrice) > Number(maxPrice);

  return (
    <div className={className}>
      <div className="sidebar-section">
        <h3>Popular Shopping Ideas</h3>
        <p>Philips</p>
        <p>All-in-one</p>
        <p>Professional</p>
        <p>Waterproof</p>
      </div>

      <div className="sidebar-section">
        <h3>Customer Reviews</h3>

        <div className="star-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`single-star ${
                star <= selectedRating ? "active-star" : ""
              }`}
              onClick={() => setSelectedRating(star)}
            >
              ★
            </span>
          ))}
          <span className="review-up-text">&nbsp; & Up</span>
        </div>

        <p className="clear-rating" onClick={() => setSelectedRating(0)}>
          Clear Rating Filter
        </p>
      </div>

      <div className="sidebar-section">
        <h3>Price</h3>

        <p className="price-range">{showRangeText}</p>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {invalidRange && (
          <p className="error-text">
            Min price cannot be greater than max price
          </p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;