function Sidebar({
  products,
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  selectedRating,
  setSelectedRating,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
}) {
  const categories = [...new Set(products.map((item) => item.category))];

  const tags = [...new Set(products.flatMap((item) => item.tags || []))].sort();

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <aside className="home-sidebar">
      <div className="sidebar-box">
        <h3>Categories</h3>

       <div className="category-checkbox-list">
          {categories.map((category) => (
            <label key={category} className="category-checkbox-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="category-checkbox-input"
              />
              <span className="category-checkbox-text">
                {category.replace(/-/g, " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="sidebar-box">
        <h3>Tags</h3>
        <div className="sidebar-tags-wrap">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`sidebar-tag-btn ${
                selectedTags.includes(tag) ? "active-tag-btn" : ""
              }`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-box">
        <h3>Customer Reviews</h3>

        <div className="star-filter">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= selectedRating ? "active-star" : ""}`}
              onClick={() =>
                setSelectedRating(selectedRating === star ? 0 : star)
              }
            >
              ★
            </span>
          ))}
        </div>

        <p className="rating-label">
          {selectedRating > 0 ? `${selectedRating} Star & Up` : "Select Rating"}
        </p>
      </div>

      <div className="sidebar-box">
        <h3>Price</h3>
        <p>
          ₹{minPrice || 0} - ₹{maxPrice || "Any"}
        </p>

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
      </div>

      <div className="sidebar-box">
        <button className="clear-filter-btn" onClick={clearFilters}>
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;