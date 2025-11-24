import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; //useLocation lay duong dan hien tai

export default function SearchForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current.addEventListener("click", handleClear);
    
    const params = new URLSearchParams(location.search); //lay tat ca cac tham so tren url
    const q = params.get("q") || ""; //lay gia tri cua tham so q
    if (location.pathname.startsWith("/products")) {
      setKeyword(q);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);

    if (keyword.trim()) params.set("q", keyword.trim());
    else params.delete("q");

    params.set("page", "1");

    navigate({ pathname: "/products", search: params.toString() });
  };

  const handleClear = () => {
    const params = new URLSearchParams(location.search);
    params.delete("q");
    params.set("page", "1");
    navigate({ pathname: "/products", search: params.toString() });
    setKeyword("");
  };

  return (
    <form className="d-flex justify-content-between" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        id="search_input"
        placeholder="Search Here"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn" />
      <span
        className="lnr lnr-cross"
        id="close_search"
        title="Close Search"
        ref={closeButtonRef}
      />
    </form>
  );
}
