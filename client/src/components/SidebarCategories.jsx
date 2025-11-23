import { useEffect, useState } from "react";
import { http } from "../lib/http";

export default function SidebarCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await http.get("/categories");
        const data = res.data.data;

        if (!canceled) {
          setCategories(data);
          setLoading(false);
        }
      } catch (error) {
        if (!canceled) {
          setError(
            error?.response?.data?.message ||
              error.message ||
              "Khong tai duoc Danh muc san pham"
          );
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      canceled = true;
    };
  }, []);
  //Sau cac buoc tren da lay duoc data Categories tu API

  return (
    <div className="sidebar-categories">
      <div className="head">Browse Categories</div>
      <ul className="main-categories">
        {loading && <div>Loading... </div>}
        {error && <div class="alert alert-danger">{error}</div>}
        {!loading &&
          !error &&
          categories.map((c) => (
            <li className="main-nav-list" key={c.id}>
              <a href="#">
                {c.name}
                <span className="number">({c.Products.length})</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
