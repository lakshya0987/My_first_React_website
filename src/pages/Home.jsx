import { useState } from "react";
import products from "../products";
import Sidebar from "../components/Sidebar";
import ProductsList from "../components/ProductsList";
import Footer from "../components/Footer";

function Home() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMin =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMax =
      maxPrice === "" || product.price <= Number(maxPrice);

    const validRange =
      minPrice === "" ||
      maxPrice === "" ||
      Number(minPrice) <= Number(maxPrice);

    const matchesRating =
      selectedRating === 0 || product.rating >= selectedRating;

    return (
      matchesSearch &&
      matchesMin &&
      matchesMax &&
      validRange &&
      matchesRating
    );
  });

  return (
    <>
      <div className="products-page">
        <h1>Our Products</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search product..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="shop-layout">
          <Sidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          <ProductsList products={filteredProducts} />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;