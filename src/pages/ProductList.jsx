import React, { useState, useMemo } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import "./ProductList.css";

export default function ProductList() {
  const location = useLocation();
  const history = useHistory();

  // URL 파싱: /women/outer -> category: women, subcategory: outer
  const pathParts = location.pathname.split('/').filter(Boolean);
  const category = pathParts[0] || 'women';
  const subcategory = pathParts[1] || 'outer';

  const [activeTab, setActiveTab] = useState("전체");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("인기상품순(전체)");
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showSizeFilter, setShowSizeFilter] = useState(false);
  const [showColorFilter, setShowColorFilter] = useState(false);

  // 브랜드 데이터
  const brandLogos = [
    { name: "아미", img: "/icons/brand_아미.png" },
    { name: "메종키츠네", img: "/icons/brand_메종키츠네.webp" },
    { name: "시에", img: "/icons/brand_시에.webp" },
    { name: "이세이미야케", img: "/icons/brand_이세이미야케.webp" },
    { name: "타미힐피거", img: "/icons/brand_타미힐피거.png" },
    { name: "디애퍼처", img: "/icons/brand_디애퍼처.webp" },
    { name: "르베이지", img: "/icons/brand_르베이지.png" },
    { name: "준지", img: "/icons/brand_준지.png" },
    { name: "단톤", img: "/icons/brand_단톤.png" },
    { name: "가니", img: "/icons/brand_가니.png" },
    { name: "토리버치", img: "/icons/brand_토리버치.jpg" },
    { name: "알투더블유", img: "/icons/brand_알투더블유.png" },
    { name: "라코스테", img: "/icons/brand_라코스테.png" },
    { name: "울랄라", img: "/icons/brand_울랄라.png" },
    { name: "세인트제임스", img: "/icons/brand_세인트제임스.webp" },
  ];

  // 카테고리 정보
  const categoryInfo = {
    women: { name: "여성", nameEn: "WOMEN" },
    men: { name: "남성", nameEn: "MEN" },
    kids: { name: "키즈", nameEn: "KIDS" },
    beauty: { name: "뷰티", nameEn: "BEAUTY" },
    sports: { name: "스포츠", nameEn: "SPORTS" },
  };

  const subcategoryInfo = {
    // Women
    outer: { name: "아우터", tabs: ["전체", "코트", "점퍼", "다운/패딩", "퍼"] },
    jacket: { name: "재킷/베스트", tabs: ["전체", "블레이저", "베스트", "라이더", "기타"] },
    knit: { name: "니트웨어", tabs: ["전체", "카디건", "니트", "베스트"] },
    shirt: { name: "셔츠/블라우스", tabs: ["전체", "셔츠", "블라우스"] },
    tshirt: { name: "티셔츠", tabs: ["전체", "반팔", "긴팔", "민소매"] },
    onepiece: { name: "원피스", tabs: ["전체", "미니", "미디", "롱"] },
    pants: { name: "팬츠", tabs: ["전체", "청바지", "슬랙스", "레깅스", "기타"] },
    skirt: { name: "스커트", tabs: ["전체", "미니", "미디", "롱"] },
    // Men
    suit: { name: "정장", tabs: ["전체", "재킷", "팬츠", "세트"] },
    // Kids
    boy: { name: "남아", tabs: ["전체", "아우터", "상의", "하의", "세트"] },
    girl: { name: "여아", tabs: ["전체", "아우터", "원피스", "상의", "하의"] },
    baby: { name: "베이비", tabs: ["전체", "우주복", "상하복", "아우터"] },
    // Beauty
    skin: { name: "스킨케어", tabs: ["전체", "클렌저", "토너", "에센스", "크림"] },
    makeup: { name: "메이크업", tabs: ["전체", "베이스", "아이", "립", "치크"] },
    perfume: { name: "향수", tabs: ["전체", "여성향수", "남성향수", "유니섹스"] },
    // Sports
    outdoor: { name: "아웃도어", tabs: ["전체", "등산복", "캠핑", "용품"] },
    running: { name: "러닝", tabs: ["전체", "의류", "신발", "용품"] },
    yoga: { name: "요가", tabs: ["전체", "상의", "하의", "매트"] },
    fitness: { name: "피트니스", tabs: ["전체", "의류", "용품"] },
    tennis: { name: "테니스", tabs: ["전체", "의류", "라켓", "용품"] },
    swim: { name: "수영", tabs: ["전체", "수영복", "수영모", "용품"] },
    // Life
    furniture: { name: "가구", tabs: ["전체", "침실", "거실", "주방"] },
    pet: { name: "반려동물", tabs: ["전체", "사료", "용품", "의류"] },
    car: { name: "자동차", tabs: ["전체", "액세서리", "용품"] },
  };

  // 카테고리별 상품 데이터 생성 함수
  const getProductsByCategory = () => {
    const categoryMap = {
      women: "여성",
      men: "남성",
      kids: "키즈",
      luxury: "럭셔리",
      shoes: "슈즈",
      sports: "스포츠",
      golf: "골프",
      beauty: "뷰티",
      life: "라이프",
      outlet: "아울렛",
    };

    const subcategoryMap = {
      outer: "아우터",
      jacket: "재킷",
      knit: "니트",
      shirt: "셔츠",
      tshirt: "티셔츠",
      onepiece: "원피스",
      pants: "팬츠",
      skirt: "스커트",
      suit: "정장",
      boy: "남아",
      girl: "여아",
      baby: "베이비",
      skin: "스킨케어",
      makeup: "메이크업",
      perfume: "향수",
      outdoor: "아웃도어",
      running: "러닝",
      yoga: "요가",
      fitness: "피트니스",
      tennis: "테니스",
      swim: "수영",
      furniture: "가구",
      pet: "반려동물",
      car: "자동차",
    };

    const catKr = categoryMap[category] || category;
    const subcatKr = subcategoryMap[subcategory] || subcategory;

    // 기본 샘플 데이터 (외부 이미지 사용)
    const sampleProducts = [
      {
        id: 1,
        brand: "BEAKER ORIGINAL",
        name: "Women Bandana Pattern Quilted Jumper - Black",
        img: "https://image.msscdn.net/images/goods_img/20231113/3658826/3658826_17077044817712_500.jpg",
        desc: "Women Bandana Pattern Quilted Jumper",
        price: "₩517,750",
        originalPrice: 545000,
        discountRate: 5,
        rating: 4.5,
        reviewCount: 64,
        wishCount: 999,
        colors: ["black", "navy"],
      },
      {
        id: 2,
        brand: "kuho plus",
        name: "Satin Short Jumper - Black",
        img: "https://image.msscdn.net/images/goods_img/20240910/4363025/4363025_17283752565451_500.jpg",
        desc: "Satin Short Jumper",
        price: "₩299,000",
        originalPrice: 299000,
        discountRate: 0,
        rating: 4.5,
        reviewCount: 540,
        wishCount: 999,
        colors: ["black"],
      },
      {
        id: 3,
        brand: "Danton",
        name: "Women 필리스 원턱 Collarless Vest - Black",
        img: "https://image.msscdn.net/images/goods_img/20240805/4251631/4251631_17280528906342_500.jpg",
        desc: "Women 필리스 원턱 Collarless Vest",
        price: "₩261,250",
        originalPrice: 275000,
        discountRate: 5,
        rating: 4.5,
        reviewCount: 18,
        wishCount: 225,
        colors: ["black", "orange"],
      },
      {
        id: 4,
        brand: "BEAKER ORIGINAL",
        name: "Women Faux Fur Shearing Vest - Beige",
        img: "https://image.msscdn.net/images/goods_img/20231114/3661896/3661896_17077182042388_500.jpg",
        desc: "Women Faux Fur Shearing Vest",
        price: "₩375,250",
        originalPrice: 395000,
        discountRate: 5,
        rating: 5.0,
        reviewCount: 13,
        wishCount: 474,
        colors: ["beige", "brown"],
      },
      {
        id: 5,
        brand: "Danton",
        name: "Women Inner Down Crewneck Jacket - White",
        img: "https://image.msscdn.net/images/goods_img/20240902/4339729/4339729_17255034743817_500.jpg",
        desc: "Women Inner Down Crewneck Jacket",
        price: "₩318,250",
        originalPrice: 335000,
        discountRate: 5,
        rating: 4.5,
        reviewCount: 48,
        wishCount: 253,
        colors: ["white", "black", "navy"],
      },
      {
        id: 6,
        brand: "BEANPOLE LADIES",
        name: "[B. my] 코튼 머신 필링 점퍼 - 블랙",
        img: "https://image.msscdn.net/images/goods_img/20240822/4297547/4297547_17242684953345_500.jpg",
        desc: "코튼 머신 필링 점퍼",
        price: "₩305,100",
        originalPrice: 339000,
        discountRate: 10,
        rating: 4.5,
        reviewCount: 20,
        wishCount: 411,
        colors: ["black", "pink", "blue"],
      },
      {
        id: 7,
        brand: "BEANPOLE LADIES",
        name: "오일 터치 경량 점퍼 - 브라운",
        img: "https://image.msscdn.net/images/goods_img/20240802/4245363/4245363_17227892699999_500.jpg",
        desc: "오일 터치 경량 점퍼",
        price: "₩449,100",
        originalPrice: 499000,
        discountRate: 10,
        rating: 4.5,
        reviewCount: 20,
        wishCount: 458,
        colors: ["brown", "beige"],
      },
      {
        id: 8,
        brand: "Danton",
        name: "Women Fleece Collarless Vest - Light Grey",
        img: "https://image.msscdn.net/images/goods_img/20240805/4251624/4251624_17227864535050_500.jpg",
        desc: "Women Fleece Collarless Vest",
        price: "₩261,250",
        originalPrice: 275000,
        discountRate: 5,
        rating: 4.5,
        reviewCount: 18,
        wishCount: 238,
        colors: ["grey", "black", "orange"],
      },
      {
        id: 9,
        brand: "8 seconds",
        name: "헤링본 와이드 카라 더블 재킷 - 카키",
        img: "https://image.msscdn.net/images/goods_img/20240808/4263049/4263049_17234063094073_500.jpg",
        desc: "헤링본 와이드 카라 더블 재킷",
        price: "₩99,900",
        originalPrice: 99900,
        discountRate: 0,
        rating: 4.5,
        reviewCount: 12,
        wishCount: 437,
        colors: ["brown", "khaki"],
      },
      {
        id: 10,
        brand: "Danton",
        name: "Women Inner Down Crewneck Jacket - Taupe",
        img: "https://image.msscdn.net/images/goods_img/20240902/4339730/4339730_17255034766071_500.jpg",
        desc: "Women Inner Down Crewneck Jacket",
        price: "₩346,750",
        originalPrice: 365000,
        discountRate: 5,
        rating: 4.5,
        reviewCount: 48,
        wishCount: 235,
        colors: ["beige", "white", "black"],
      },
      {
        id: 11,
        brand: "Danton",
        name: "Women Overall Jacket - Charcoal",
        img: "https://image.msscdn.net/images/goods_img/20240902/4339744/4339744_17255034847024_500.jpg",
        desc: "Women Overall Jacket",
        price: "₩603,250",
        originalPrice: 635000,
        discountRate: 5,
        rating: 4.5,
        reviewCount: 2,
        wishCount: 195,
        colors: ["charcoal", "black"],
      },
      {
        id: 12,
        brand: "PLAY COMME DES GARCONS",
        name: "(Unisex) Double Red Heart Wappen Cotton Hood Zip-up - Black",
        img: "https://image.msscdn.net/images/goods_img/20230816/3470063/3470063_16922291926854_500.jpg",
        desc: "Double Red Heart Wappen Cotton Hood Zip-up",
        price: "₩335,000",
        originalPrice: 335000,
        discountRate: 0,
        rating: 4.5,
        reviewCount: 1,
        wishCount: 197,
        colors: ["black"],
      },
    ];

    // 로컬 이미지 기반 데이터 추가 (기존 구조 호환)
    const localProducts = [];

    // 여성 아우터 로컬 데이터 (기존 데이터 유지)
    if (category === "women" && subcategory === "outer") {
      const womenOuterData = [
        { id: 101, name: "베이지 캐주얼 자켓", desc: "데일리로 활용하기 좋은 기본 아우터", price: "₩129,000", img: "/images/여성/아우터/women_outer1.webp" },
        { id: 102, name: "패턴 자켓", desc: "유니크한 감각으로 스트릿 패션에 적합", price: "₩159,000", img: "/images/여성/아우터/women_outer2.webp" },
        { id: 103, name: "블랙 라이더 자켓", desc: "시크한 무드의 포인트 아이템", price: "₩189,000", img: "/images/여성/아우터/women_outer3.webp" },
        { id: 104, name: "경량 패딩 자켓", desc: "가볍지만 따뜻한 간절기 필수템", price: "₩99,000", img: "/images/여성/아우터/women_outer4.webp" },
        { id: 105, name: "카키 오버핏 자켓", desc: "편안한 핏으로 스타일리시하게 연출 가능", price: "₩149,000", img: "/images/여성/아우터/women_outer5.webp" },
        { id: 106, name: "블랙 포켓 자켓", desc: "실용성과 멋을 동시에 갖춘 아이템", price: "₩139,000", img: "/images/여성/아우터/women_outer6.webp" },
      ];
      womenOuterData.forEach(item => {
        localProducts.push({
          ...item,
          brand: "SSF SHOP",
          rating: 4.5,
          reviewCount: Math.floor(Math.random() * 100) + 10,
          wishCount: Math.floor(Math.random() * 500) + 50,
        });
      });
    }

    // 여성 재킷 로컬 데이터
    if (category === "women" && subcategory === "jacket") {
      for (let i = 1; i <= 6; i++) {
        localProducts.push({
          id: 200 + i,
          brand: "SSF SHOP",
          name: `${subcatKr} 상품 ${i}`,
          desc: `스타일리시한 ${subcatKr}`,
          price: `₩${(Math.floor(Math.random() * 200) + 100) * 1000}`,
          img: `/images/${catKr}/${subcatKr}/women_Jacket${i}.webp`,
          rating: 4.5,
          reviewCount: Math.floor(Math.random() * 100),
          wishCount: Math.floor(Math.random() * 500),
        });
      }
    }

    // 샘플 데이터와 로컬 데이터 병합
    return [...sampleProducts, ...localProducts];
  };

  const products = getProductsByCategory();

  const currentCategory = categoryInfo[category] || { name: category, nameEn: category };
  const currentSubcategory = subcategoryInfo[subcategory] || { name: subcategory, tabs: ["전체"] };

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return price;
    }
    return `₩${price.toLocaleString()}`;
  };

  const handleProductClick = (product) => {
    // ProductThumb와 동일한 방식으로 데이터 정규화
    const normalized = {
      id: product.id,
      name: product.name || "상품명 없음",
      image: product.image || product.img || "",
      img: product.image || product.img || "", // img 필드도 함께 추가
      price:
        typeof product.price === "string"
          ? Number(String(product.price).replace(/[^\d]/g, "")) || 0
          : Number(product.price || 0),
      desc: product.desc || "",
      brand: product.brand || "",
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
    };

    console.log("클릭한 상품:", product);
    console.log("정규화된 데이터:", normalized);

    localStorage.setItem("lastProduct", JSON.stringify(normalized));
    history.push(`/product/${normalized.id}`, { product: normalized });
  };

  return (
    <div className="product-list-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="separator">&gt;</span>
          <Link to={`/${category}`}>{currentCategory.name}</Link>
          <span className="separator">&gt;</span>
          <span className="current">{currentSubcategory.name}</span>
        </div>
      </div>

      <div className="container">
        {/* Page Title */}
        <div className="page-header">
          <h1 className="page-title">
            {currentSubcategory.name} <span className="count">34,085개 상품</span>
          </h1>
        </div>

        {/* Brand Logos Section */}
        <div className="brand-logos-section">
          {brandLogos.map((brand, index) => (
            <div key={index} className="brand-logo-item">
              <img src={brand.img} alt={brand.name} onError={(e) => e.target.style.display = 'none'} />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="category-tabs">
          {currentSubcategory.tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="filter-section">
          <div className="filter-buttons">
            <div className="filter-dropdown">
              <button
                className="filter-btn"
                onClick={() => setShowBrandFilter(!showBrandFilter)}
              >
                브랜드 <span className="arrow">∨</span>
              </button>
            </div>
            <div className="filter-dropdown">
              <button
                className="filter-btn"
                onClick={() => setShowPriceFilter(!showPriceFilter)}
              >
                가격 <span className="arrow">∨</span>
              </button>
            </div>
            <div className="filter-dropdown">
              <button
                className="filter-btn"
                onClick={() => setShowSizeFilter(!showSizeFilter)}
              >
                사이즈 <span className="arrow">∨</span>
              </button>
            </div>
            <div className="filter-dropdown">
              <button
                className="filter-btn"
                onClick={() => setShowColorFilter(!showColorFilter)}
              >
                색상 <span className="arrow">∨</span>
              </button>
            </div>
            <div className="filter-dropdown">
              <button className="filter-btn">
                혜택/배송 <span className="arrow">∨</span>
              </button>
            </div>
          </div>

          <div className="sort-section">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>인기상품순(전체)</option>
              <option>신상품순</option>
              <option>낮은가격순</option>
              <option>높은가격순</option>
              <option>할인율순</option>
              <option>리뷰많은순</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className="product-image-link"
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-image-wrapper">
                  <img
                    src={product.image || product.img}
                    alt={product.name}
                    className="product-image"
                  />
                  <button className="wishlist-btn" aria-label="찜하기" onClick={(e) => e.stopPropagation()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <div
                  className="product-name"
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  {product.name}
                </div>

                <div className="product-price">
                  {product.discountRate > 0 && (
                    <>
                      <span className="original-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="discount-rate">{product.discountRate}%</span>
                    </>
                  )}
                  <span className="price">{formatPrice(product.price)}</span>
                </div>

                {product.rating && (
                  <div className="product-meta">
                    <div className="rating-reviews">
                      <span className="rating">★ {product.rating}({product.reviewCount || 0})</span>
                      {product.wishCount && <span className="wishlist">♥ {product.wishCount}+</span>}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div className="product-colors">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="color-dot"
                        style={{
                          backgroundColor:
                            color === "black"
                              ? "#000"
                              : color === "white"
                              ? "#fff"
                              : color === "navy"
                              ? "#001f3f"
                              : color === "beige"
                              ? "#f5f5dc"
                              : color === "brown"
                              ? "#8b4513"
                              : color === "orange"
                              ? "#ff6600"
                              : color === "pink"
                              ? "#ff69b4"
                              : color === "blue"
                              ? "#0074d9"
                              : color === "grey"
                              ? "#808080"
                              : color === "khaki"
                              ? "#c3b091"
                              : color === "charcoal"
                              ? "#36454f"
                              : color,
                        }}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <button className="page-btn">&gt;</button>
        </div>
      </div>
    </div>
  );
}
