import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductsList from "../components/ProductsList";
import Footer from "../components/Footer";

function Home({
  products,
  search,
  setSearch,
  selectedRating,
  setSelectedRating,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  addToCart,
  cart,
  totalCartItems,
}) {
  return (
    <div className="page-wrapper">
      <Navbar
        search={search}
        setSearch={setSearch}
        totalCartItems={totalCartItems}
      />

      <main className="main-layout">
        <Sidebar
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <ProductsList
          products={products}
          addToCart={addToCart}
          cart={cart}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Home;