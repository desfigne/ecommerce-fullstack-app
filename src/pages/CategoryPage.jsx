import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { CATEGORY_DATA } from "../data/categoryData";
import { getProductsByCategory } from "../data/productData";
import "./Page.css";
import "../styles/CategoryPage.css";

function CategoryPage() {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("");
  const [sortBy, setSortBy] = useState("인기상품순(전체)");
  const [products, setProducts] = useState([]);

  // URL 경로에서 카테고리와 서브카테고리 파싱
  const pathname = location.pathname;
  const pathParts = pathname.split("/").filter(Boolean);
  const categoryKey = pathParts[0]; // e.g., 'women', 'men', 'kids'
  const subcategoryKey = pathParts[1] || "main"; // e.g., 'outer', 'jacket', or 'main' for root

  // 카테고리 데이터 가져오기
  const categoryData = CATEGORY_DATA[categoryKey];

  useEffect(() => {
    if (categoryData) {
      // URL에서 현재 서브카테고리 찾기
      const currentPath = pathname;
      const matchingSubcat = categoryData.subcategories.find(
        (sub) => sub.path === currentPath
      );

      if (matchingSubcat) {
        setActiveTab(matchingSubcat.name);
      } else {
        // 기본값: 첫 번째 서브카테고리 (전체)
        setActiveTab(categoryData.subcategories[0].name);
      }

      // 여기서 서브카테고리별 상품 데이터를 로드할 수 있습니다
      // 현재는 빈 배열로 설정 (기존 상품 데이터가 있다면 여기서 로드)
      loadProducts(categoryKey, subcategoryKey);
    }
  }, [pathname, categoryKey, subcategoryKey, categoryData]);

  const loadProducts = (category, subcategory) => {
    // productData에서 카테고리/서브카테고리에 맞는 상품 데이터 가져오기
    const productList = getProductsByCategory(category, subcategory);
    setProducts(productList);
  };

  const goToProductDetail = (product) => {
    console.log("Clicked product:", product);
    const normalized = {
      id: product.id,
      name: product.name || "상품명 없음",
      image: product.image || product.img || "",
      price:
        typeof product.price === "string"
          ? Number(String(product.price).replace(/[^\d]/g, "")) || 0
          : Number(product.price || 0),
      desc: product.desc || "",
    };
    console.log("Normalized product:", normalized);
    localStorage.setItem("lastProduct", JSON.stringify(normalized));
    console.log("Navigating to:", `/product/${normalized.id}`);
    history.push(`/product/${normalized.id}`, { product: normalized });
  };

  // 카테고리 데이터가 없으면 에러 페이지 또는 홈으로 리다이렉트
  if (!categoryData) {
    return (
      <div className="category-page">
        <div className="container">
          <h1>카테고리를 찾을 수 없습니다</h1>
          <Link to="/">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const pageData = categoryData.pages[subcategoryKey] || categoryData.pages.main;
  const isMainCategory = subcategoryKey === "main";

  // Breadcrumb 경로 생성
  const breadcrumbItems = [{ name: "Home", path: "/" }];
  breadcrumbItems.push({ name: categoryData.name, path: `/${categoryKey}` });
  if (!isMainCategory && pageData) {
    breadcrumbItems.push({ name: pageData.title, path: pathname });
  }

  return (
    <div className="category-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {index === breadcrumbItems.length - 1 ? (
                <span className="current">{item.name}</span>
              ) : (
                <>
                  <Link to={item.path}>{item.name}</Link>
                  <span className="separator">&gt;</span>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Page Title */}
        <div className="page-header">
          <h1 className="page-title">
            {pageData.title} <span className="count">{pageData.count}개 상품</span>
          </h1>
        </div>

        {/* Subcategory Tabs */}
        <div className="category-tabs">
          {categoryData.subcategories.map((subcat) => (
            <Link
              key={subcat.name}
              to={subcat.path}
              className={`tab ${activeTab === subcat.name ? "active" : ""}`}
              onClick={() => setActiveTab(subcat.name)}
            >
              {subcat.name}
            </Link>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="filter-section">
          <div className="filter-buttons">
            <button className="filter-btn">
              브랜드 <span className="arrow">∨</span>
            </button>
            <button className="filter-btn">
              가격 <span className="arrow">∨</span>
            </button>
            <button className="filter-btn">
              사이즈 <span className="arrow">∨</span>
            </button>
            <button className="filter-btn">
              색상 <span className="arrow">∨</span>
            </button>
            <button className="filter-btn">
              혜택/배송 <span className="arrow">∨</span>
            </button>
          </div>

          <div className="sort-section">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>인기상품순(전체) ↑↓</option>
              <option>신상품순</option>
              <option>낮은가격순</option>
              <option>높은가격순</option>
              <option>할인율순</option>
              <option>리뷰많은순</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((p) => (
              <div className="product-card" key={p.id} onClick={() => goToProductDetail(p)}>
                <img src={p.image} alt={p.name} />
                <h4>{p.name}</h4>
                <p className="desc">{p.desc}</p>
                <p className="price">{p.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid">
            <img src="/images/sample1.jpg" alt="" />
            <img src="/images/sample2.jpg" alt="" />
            <img src="/images/sample3.jpg" alt="" />
            <img src="/images/sample4.jpg" alt="" />
            <img src="/images/sample5.jpg" alt="" />
            <img src="/images/sample6.jpg" alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
