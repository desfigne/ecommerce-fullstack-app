
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Page.css";
import "./WomenMain.css";

function WomenMain() {
  const [activeTab, setActiveTab] = useState("전체");
  const [sortBy, setSortBy] = useState("인기상품순(전체)");

  const subcategories = [
    { name: "전체", path: "/women" },
    { name: "아우터", path: "/women/outer" },
    { name: "재킷/베스트", path: "/women/jacket" },
    { name: "니트", path: "/women/knit" },
    { name: "셔츠/블라우스", path: "/women/shirt" },
    { name: "티셔츠", path: "/women/tshirt" },
    { name: "원피스", path: "/women/onepiece" },
    { name: "팬츠", path: "/women/pants" },
    { name: "스커트", path: "/women/skirt" },
    { name: "라운지/언더웨어", path: "/women" },
    { name: "비치웨어", path: "/women" },
    { name: "패션잡화", path: "/women" },
    { name: "슈얼리/시계", path: "/women" },
    { name: "신상품", path: "/women/new" },
  ];

  return (
    <div className="category-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="separator">&gt;</span>
          <span className="current">여성</span>
        </div>
      </div>

      <div className="container">
        {/* Page Title */}
        <div className="page-header">
          <h1 className="page-title">
            여성 <span className="count">580,227개 상품</span>
          </h1>
        </div>

        {/* Subcategory Tabs */}
        <div className="category-tabs">
          {subcategories.map((subcat) => (
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

        {/* Original Content */}
        <div className="grid">
          <img src="/images/sample1.jpg" alt="" />
          <img src="/images/sample2.jpg" alt="" />
          <img src="/images/sample3.jpg" alt="" />
          <img src="/images/sample4.jpg" alt="" />
          <img src="/images/sample5.jpg" alt="" />
          <img src="/images/sample6.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
export default WomenMain;
