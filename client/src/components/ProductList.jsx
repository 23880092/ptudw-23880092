import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { http } from "../lib/http";
import FilterBar from "./FilterBar";
import SidebarCategories from "./SidebarCategories";
import SidebarFilter from "../assets/SidebarFilter";
import SingleProduct from "./SingleProduct";
import Banner from "./Banner";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLitmit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  //Lay cac gia tri tu search params
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = searchParams.get("page") || 1;
  const min = Number(searchParams.get("min")) || 0;
  const max = Number(searchParams.get("max")) || 100;
  const q = searchParams.get("q") || "";
  const [priceRange, setPriceRange] = useState([min, max]);

  // /products?category=1 => /products?categoryId=1
  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    p.set("limit", limit);
    p.set("page", page);
    if (q) p.set("search", q);
    if (category) p.set("categoryId", category);
    if (sort) p.set("sort", sort);
    if (min) p.set("minPrice", min);
    if (max) p.set("maxPrice", max);

    return p.toString();
  }, [q, category, sort, limit, page, min, max]);

  function handleSortChange(value) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.delete("sort");
    else next.set("sort", value);
    //Reset ve trang 1 khi thay doi sort
    next.set("page", 1);
    setSearchParams(next);
  }

  function handleLitmitChange(value) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", 1);
    setSearchParams(next);
    setLitmit(value);
  }

  function handlePageChange(value) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.set("page", 1);
    else next.set("page", value);
    //Reset ve trang 1 khi thay doi sort
    setSearchParams(next);
  }

  function handlePriceRangeChange(value) { //value la mang [min, max]
    setPriceRange(value);
    const next = new URLSearchParams(searchParams.toString());
    if (value[0] === null) next.delete("min");
    else next.set("min", String(value[0]));
    if (value[1] === null) next.delete("max");
    else next.set("max", String(value[1]));

    next.set("page", 1);
    setSearchParams(next);
  }

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError(null);

    async function loadProducts() {
      try {
        const res = await http.get(`/products?${queryString}`);
        const data = res.data.data;

        if (!canceled) {
          setProducts(data.products);
          setTotalPages(data.pagingnation.totalPages);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (!canceled) {
          setLoading(false);
          setError(
            err?.response?.data?.message ||
              err?.message || //hay la err?.message
              "Khong tai duoc san pham"
          );
        }
      }
    }

    loadProducts();

    return () => {
      canceled = true;
    };
  }, [queryString]);

  return (
    <>
      <Banner />
      <div className="container py-4">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5">
            <SidebarCategories />
            <SidebarFilter 
                priceRange={priceRange} 
                onChange={handlePriceRangeChange} />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7">
            {loading && <div>Loading... </div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && (
              <>
                {/* Start Filter Bar */}
                <FilterBar
                  sort={sort}
                  onSortChange={handleSortChange}
                  limit={limit}
                  onLimitChange={handleLitmitChange}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                {/* End Filter Bar */}
                {/* Start Best Seller */}
                <section className="lattest-product-area pb-40 category-list">
                  <div className="row">
                    {products.length === 0 ? (
                      <div className="alert alert-info">No product found</div>
                    ) : (
                      <>
                        {products.map((p) => (
                          <SingleProduct key={p.id} product={p} />
                        ))}
                      </>
                    )}
                  </div>
                </section>
                {/* End Best Seller */}
                {/* Start Filter Bar */}
                <FilterBar
                  sort={sort}
                  onSortChange={handleSortChange}
                  limit={limit}
                  onLimitChange={handleLitmitChange}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                {/* End Filter Bar */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
