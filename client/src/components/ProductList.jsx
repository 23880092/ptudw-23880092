import { useEffect, useState } from "react";
import { http } from "../lib/http";
import FilterBar from "./FilterBar";
import SidebarCategories from "./SidebarCategories";
import SidebarFilter from "./SidebarFilter";
import SingleProduct from "./SingleProduct";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError(null);

    async function loadProducts() {
      try {
        const res = await http.get("/products");
        const data = res.data.data;

        if (!canceled) {
          setProducts(data.products);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (!canceled) {
          setLoading(false);
          setError(
            err?.response?.data?.message ||
              err.message || //hay la err?.message
              "Khong tai duoc san pham"
          );
        }
      }
    }

    loadProducts();

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-5">
          <SidebarCategories />
          <SidebarFilter />
        </div>
        <div className="col-xl-9 col-lg-8 col-md-7">
          {/* Start Filter Bar */}
          <FilterBar />
          {/* End Filter Bar */}
          {/* Start Best Seller */}
          <section className="lattest-product-area pb-40 category-list">
            <div className="row">
              {loading && <div>Loading... </div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {!loading && !error && (
                <>
                  {products.length === 0 ? (
                    <div className="alert alert-info">No product found</div>
                  ) : (
                    <>
                      {products.map((p) => (
                        <SingleProduct key={p.id} product={p}/>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </section>
          {/* End Best Seller */}
          {/* Start Filter Bar */}
          <FilterBar />
          {/* End Filter Bar */}
        </div>
      </div>
    </div>
  );
}
