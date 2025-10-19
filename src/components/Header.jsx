import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("loginUser")) || null;
    } catch {
      return null;
    }
  });

  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuTopPosition, setMenuTopPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const headerRef = useRef(null);

  // 인기검색어 데이터 (순위 변동: 'up', 'down', null)
  const popularSearches = [
    { rank: 1, keyword: "에잇세컨즈", trend: null },
    { rank: 2, keyword: "빈폴레이디스", trend: null },
    { rank: 3, keyword: "단톤", trend: null },
    { rank: 4, keyword: "메종키츠네", trend: null },
    { rank: 5, keyword: "로메르", trend: null },
    { rank: 6, keyword: "빈폴키즈", trend: null },
    { rank: 7, keyword: "카디건", trend: null },
    { rank: 8, keyword: "꽁데가르송", trend: "up" },
    { rank: 9, keyword: "준지", trend: "down" },
    { rank: 10, keyword: "폴리즈클로젯", trend: "down" },
  ];

  // 자동완성 연관 검색어 데이터
  const autocompleteKeywords = [
    "카디건", "가방", "가니", "남자 가죽 자켓", "여성 카디건",
    "메종키츠네 카디건", "남자 카디건", "발렌시아가", "로메르 가방",
    "에잇세컨즈 가방", "구호", "구호플러스", "나이키", "니트", "니트웨어",
    "단톤", "데님", "데님팬츠", "드레스", "띠어리", "로고", "로퍼",
    "맨투맨", "면바지", "목도리", "무스탕", "반팔티", "발렌시아가 가방",
    "백팩", "뱀부백", "부츠", "블라우스", "빈폴", "빈폴레이디스",
    "빈폴키즈", "사파리재킷", "셔츠", "스니커즈", "슬랙스", "아우터",
    "앵클부츠", "야상", "에코백", "원피스", "울코트", "자켓", "재킷",
    "정장", "조끼", "청바지", "체크셔츠", "카라티", "코트", "크로스백",
    "티셔츠", "트렌치코트", "트레이닝복", "파카", "패딩", "폴로셔츠",
    "플리츠스커트", "후드티", "후드집업"
  ];

  // 브랜드 데이터
  const brandData = [
    { name: "GANNI", nameKr: "가니", link: "/brand/ganni" },
    { name: "GANISONG", nameKr: "가니송", link: "/brand/ganisong" },
    { name: "Wilhelmina Garcia", nameKr: "빌헬미나 가르시아", link: "/brand/wilhelmina-garcia" },
    { name: "에잇세컨즈", nameEn: "8SECONDS", link: "/brand/8seconds" },
    { name: "빈폴", nameEn: "BEANPOLE", link: "/brand/beanpole" },
    { name: "빈폴레이디스", nameEn: "BEANPOLE LADIES", link: "/brand/beanpole-ladies" },
    { name: "빈폴키즈", nameEn: "BEANPOLE KIDS", link: "/brand/beanpole-kids" },
    { name: "구호", nameEn: "KUHO", link: "/brand/kuho" },
    { name: "구호플러스", nameEn: "KUHO PLUS", link: "/brand/kuho-plus" },
    { name: "메종키츠네", nameEn: "MAISON KITSUNE", link: "/brand/maison-kitsune" },
    { name: "아미", nameEn: "AMI", link: "/brand/ami" },
    { name: "단톤", nameEn: "DANTON", link: "/brand/danton" },
    { name: "띠어리", nameEn: "THEORY", link: "/brand/theory" },
    { name: "로메르", nameEn: "LEMAIRE", link: "/brand/lemaire" },
    { name: "발렌시아가", nameEn: "BALENCIAGA", link: "/brand/balenciaga" },
    { name: "토리버치", nameEn: "TORY BURCH", link: "/brand/tory-burch" },
    { name: "꽁데가르송", nameEn: "COMME DES GARCONS", link: "/brand/comme-des-garcons" },
    { name: "준지", nameEn: "JUUN.J", link: "/brand/junji" },
  ];

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.length);
      } catch {
        setCartCount(0);
      }
    };

    const updateWishCount = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishCount(wishlist.length);
      } catch {
        setWishCount(0);
      }
    };

    const loadRecentSearches = () => {
      try {
        const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
        setRecentSearches(recent);
      } catch {
        setRecentSearches([]);
      }
    };

    const sync = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
      try {
        setUser(JSON.parse(localStorage.getItem("loginUser")) || null);
      } catch {
        setUser(null);
      }
      updateCartCount();
      updateWishCount();
    };

    // 초기 로드 시 장바구니 및 찜 개수 업데이트
    updateCartCount();
    updateWishCount();
    loadRecentSearches();

    // storage 이벤트 리스너 (다른 탭/창에서 변경 감지)
    window.addEventListener("storage", sync);

    // 커스텀 이벤트 리스너 (같은 탭에서 변경 감지)
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("wishlistUpdated", updateWishCount);

    // auth:changed 이벤트 리스너 (로그인/로그아웃 시)
    window.addEventListener("auth:changed", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("wishlistUpdated", updateWishCount);
      window.removeEventListener("auth:changed", sync);
    };
  }, []);

  useEffect(() => {
    const updateMenuPosition = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        setMenuTopPosition(headerRect.bottom);
      }
    };

    updateMenuPosition();
    window.addEventListener('scroll', updateMenuPosition);
    window.addEventListener('resize', updateMenuPosition);

    return () => {
      window.removeEventListener('scroll', updateMenuPosition);
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [bannerVisible]);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("loginUser");
    setIsLogin(false);
    setUser(null);
    try { window.dispatchEvent(new Event("auth:changed")); } catch {}
    alert("로그아웃 되었습니다.");
    window.location.href = "/#/login";
  };

  const handleCartClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      alert("로그인이 필요합니다.");
      window.location.href = "/#/login";
    }
  };

  const handleMyPageClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      alert("로그인이 필요합니다.");
      window.location.href = "/#/login";
    }
  };

  const handleSearch = (keyword) => {
    if (!keyword.trim()) return;

    // 최근 검색어에 추가
    try {
      let recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
      // 중복 제거
      recent = recent.filter(item => item !== keyword);
      // 맨 앞에 추가
      recent.unshift(keyword);
      // 최대 10개까지만 저장
      recent = recent.slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(recent));
      setRecentSearches(recent);
    } catch (e) {
      console.error("Failed to save recent search", e);
    }

    // 검색 페이지로 이동
    window.location.href = `/#/search?q=${encodeURIComponent(keyword)}`;
    setSearchModalOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const removeRecentSearch = (keyword) => {
    try {
      let recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
      recent = recent.filter(item => item !== keyword);
      localStorage.setItem("recentSearches", JSON.stringify(recent));
      setRecentSearches(recent);
    } catch (e) {
      console.error("Failed to remove recent search", e);
    }
  };

  const clearAllRecentSearches = () => {
    try {
      localStorage.removeItem("recentSearches");
      setRecentSearches([]);
    } catch (e) {
      console.error("Failed to clear recent searches", e);
    }
  };

  // 검색어 자동완성 필터링
  const filteredKeywords = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return autocompleteKeywords
      .filter(keyword => keyword.toLowerCase().includes(query))
      .slice(0, 10);
  }, [searchQuery]);

  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return brandData
      .filter(brand =>
        brand.name.toLowerCase().includes(query) ||
        (brand.nameKr && brand.nameKr.toLowerCase().includes(query)) ||
        (brand.nameEn && brand.nameEn.toLowerCase().includes(query))
      )
      .slice(0, 10);
  }, [searchQuery]);

  // 자동완성 결과가 있는지 확인
  const hasAutocompleteResults = filteredKeywords.length > 0 || filteredBrands.length > 0;

  return (
    <>
      {/* Mega Menu Overlay */}
      {activeMenu && (
        <div
          className="mega-menu-overlay"
          style={{ top: `${menuTopPosition}px` }}
          onClick={() => setActiveMenu(null)}
        />
      )}

      {/* Top Banner */}
      {bannerVisible && (
        <div className="top-banner">
          <div className="container">
            <span>🎉 신규 회원 가입시 10,000원 쿠폰 즉시 지급! </span>
            <Link to="/event">자세히 보기 →</Link>
            <button
              className="banner-close"
              onClick={() => setBannerVisible(false)}
              aria-label="배너 닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header" ref={headerRef}>
        {/* User Menu */}
        <div className="user-menu-wrapper">
          <div className="container">
            <div className="user-menu">
              <Link to="/mypage" onClick={handleMyPageClick}>
                마이페이지{isLogin && user?.name ? ` (${user.name}님)` : ""}
              </Link>
              {isLogin ? (
                <button onClick={handleLogout} className="logout-btn">
                  로그아웃
                </button>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </div>
          </div>
        </div>

        {/* Logo and Actions */}
        <div className="logo-section">
          <div className="container">
            <div className="logo-section-inner">
              <Link to="/" className="logo">
                <img src="https://ext.same-assets.com/947818454/418726284.svg" alt="SSF SHOP" />
              </Link>

              <div className="header-right">
                <div className="header-actions">
                  <button className="search-btn" aria-label="검색" onClick={() => setSearchModalOpen(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <Link to="/mypage" state={{ activeTab: "wishlist" }} className="wishlist-btn" aria-label="위시리스트">
                    {wishCount > 0 && <span className="cart-count">{wishCount}</span>}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <Link to="/cart" className="cart-btn" aria-label="장바구니" onClick={handleCartClick}>
                    <span className="cart-count">{cartCount}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
                      <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
                      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                <div className="nav-divider"></div>

                <div className="brand-logos">
                  <Link to="/brand/10-corso-como">
                    <img src="https://ext.same-assets.com/947818454/451353350.svg" alt="10 CORSO COMO" />
                  </Link>
                  <Link to="/brand/beaker">
                    <img src="https://ext.same-assets.com/947818454/863943049.svg" alt="BEAKER" />
                  </Link>
                  <Link to="/brand/another">
                    <img src="https://ext.same-assets.com/947818454/2516667277.svg" alt="ANOTHER#" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menus */}
        <div className="nav-section">
          <div className="container">
            <div className="nav-wrapper">
              <nav className="product-nav" onMouseLeave={() => setActiveMenu(null)}>
                <ul>
                  <li className="nav-item" onMouseEnter={() => setActiveMenu('women')}>
                    <Link to="/women">여성</Link>
                    <div className={`mega-menu ${activeMenu === 'women' ? 'active' : ''}`} style={{ top: `${menuTopPosition}px` }}>
                      <div className="container">
                        <div className="mega-menu-inner">
                          <div className="mega-menu-column">
                            <h4>의류</h4>
                            <ul>
                              <li><Link to="/women/outer">아우터</Link></li>
                              <li><Link to="/women/jacket">재킷/베스트</Link></li>
                              <li><Link to="/women/knit">니트웨어</Link></li>
                              <li><Link to="/women/shirt">셔츠/블라우스</Link></li>
                              <li><Link to="/women/tshirt">티셔츠</Link></li>
                              <li><Link to="/women/onepiece">원피스</Link></li>
                              <li><Link to="/women/pants">팬츠</Link></li>
                              <li><Link to="/women/skirt">스커트</Link></li>
                            </ul>
                          </div>
                          <div className="mega-menu-column">
                            <h4>라이프스타일</h4>
                            <ul>
                              <li><Link to="/women/underwear">언더웨어</Link></li>
                              <li><Link to="/women/homewear">홈웨어</Link></li>
                              <li><Link to="/women/beachwear">비치웨어</Link></li>
                              <li><Link to="/women/accessory">액세서리</Link></li>
                              <li><Link to="/women/jewelry">주얼리/시계</Link></li>
                            </ul>
                          </div>
                          <div className="mega-menu-brands">
                            <h4>추천 브랜드</h4>
                            <div className="brand-list">
                              <Link to="/brand/8seconds">에잇세컨즈</Link>
                              <Link to="/brand/sisley">시예</Link>
                              <Link to="/brand/tory-burch">토리버치</Link>
                              <Link to="/brand/beanpole">빈폴</Link>
                              <Link to="/brand/pleats-please">플리츠 플리즈 이세이 미야케</Link>
                              <Link to="/brand/lemaire">르메르</Link>
                              <Link to="/brand/kuho-plus">구호플러스</Link>
                              <Link to="/brand/rebaige">르베이지</Link>
                              <Link to="/brand/sandsound">샌드사운드</Link>
                              <Link to="/brand/ami">아미</Link>
                              <Link to="/brand/junji">준지</Link>
                              <Link to="/brand/general-idea">제너럴아이디어</Link>
                              <Link to="/brand/kuho">구호</Link>
                              <Link to="/brand/danton">단톤</Link>
                              <Link to="/brand/rag-bone">랙앤본</Link>
                              <Link to="/brand/theory">띠어리</Link>
                              <Link to="/brand/lamb">램</Link>
                              <Link to="/brand/verdemarre">베르데마르</Link>
                              <Link to="/brand/maison-kitsune">메종키츠네</Link>
                              <Link to="/brand/ganni">가니</Link>
                              <Link to="/brand/alice-olivia">앨릭스 앤 올리비아</Link>
                              <Link to="/brand/beaker-original">비아커 오리지널</Link>
                              <Link to="/brand/cos">코스</Link>
                              <Link to="/brand/ollala">올랄라</Link>
                              <Link to="/brand/diapter">디아퍼처</Link>
                              <Link to="/brand/saint-james">세인트제임스</Link>
                              <Link to="/brand/northface">노스페이스</Link>
                              <Link to="/brand/play-cdg">플레이 꼼데가르송</Link>
                              <Link to="/brand/lacoste">라코스테</Link>
                              <Link to="/brand/all-to-do">알튜더블유</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item" onMouseEnter={() => setActiveMenu('men')}>
                    <Link to="/men">남성</Link>
                    <div className={`mega-menu ${activeMenu === 'men' ? 'active' : ''}`} style={{ top: `${menuTopPosition}px` }}>
                      <div className="container">
                        <div className="mega-menu-inner">
                          <div className="mega-menu-column">
                            <h4>의류</h4>
                            <ul>
                              <li><Link to="/men/outer">아우터</Link></li>
                              <li><Link to="/men/suit">정장</Link></li>
                              <li><Link to="/men/jacket">재킷/베스트</Link></li>
                              <li><Link to="/men/shirt">셔츠</Link></li>
                              <li><Link to="/men/knit">니트웨어</Link></li>
                              <li><Link to="/men/tshirt">티셔츠</Link></li>
                              <li><Link to="/men/pants">팬츠</Link></li>
                            </ul>
                          </div>
                          <div className="mega-menu-column">
                            <h4>액세서리</h4>
                            <ul>
                              <li><Link to="/men/bag">가방</Link></li>
                              <li><Link to="/men/shoes">신발</Link></li>
                              <li><Link to="/men/hat">모자</Link></li>
                              <li><Link to="/men/belt">벨트</Link></li>
                              <li><Link to="/men/wallet">지갑</Link></li>
                              <li><Link to="/men/jewelry">주얼리/시계</Link></li>
                            </ul>
                          </div>
                          <div className="mega-menu-brands">
                            <h4>추천 브랜드</h4>
                            <div className="brand-list">
                              <Link to="/brand/8seconds">에잇세컨즈</Link>
                              <Link to="/brand/beanpole">빈폴</Link>
                              <Link to="/brand/ami">아미</Link>
                              <Link to="/brand/junji">준지</Link>
                              <Link to="/brand/play-cdg">플레이 꼼데가르송</Link>
                              <Link to="/brand/maison-kitsune">메종키츠네</Link>
                              <Link to="/brand/rokadis">로카디스</Link>
                              <Link to="/brand/theory">띠어리</Link>
                              <Link to="/brand/lamb">램</Link>
                              <Link to="/brand/galaxy">갤러시</Link>
                              <Link to="/brand/homme-plisse">옴므 플리세 이세이 미야케</Link>
                              <Link to="/brand/lacoste">라코스테</Link>
                              <Link to="/brand/danton">단톤</Link>
                              <Link to="/brand/beaker-original">비아커 오리지널</Link>
                              <Link to="/brand/galaxy-lifestyle">갤럭시라이프스타일</Link>
                              <Link to="/brand/gungee-woolens">건지울른스</Link>
                              <Link to="/brand/lemaire">르메르</Link>
                              <Link to="/brand/alvin-clo">엘빈클로</Link>
                              <Link to="/brand/levis">리바이스</Link>
                              <Link to="/brand/daniel-cremieux">다니엘크레뮤</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li><Link to="/kids">키즈</Link></li>
                  <li><Link to="/luxury">럭셔리</Link></li>
                  <li><Link to="/shoes">백&슈즈</Link></li>
                  <li><Link to="/sports">스포츠</Link></li>
                  <li><Link to="/golf">골프</Link></li>
                  <li><Link to="/beauty">뷰티</Link></li>
                  <li><Link to="/life">라이프</Link></li>
                  <li><Link to="/outlet">아울렛</Link></li>
                </ul>
              </nav>

              <div className="nav-divider"></div>

              <nav className="sub-nav">
                <ul>
                  <li><Link to="/ranking">랭킹</Link></li>
                  <li><Link to="/brands">브랜드</Link></li>
                  <li><Link to="/magazine">매거진</Link></li>
                  <li><Link to="/special" className="nav-link-special">기획전</Link></li>
                  <li><Link to="/event" className="nav-link-special">이벤트</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" aria-label="메뉴" onClick={() => setMobileMenuOpen(true)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Search Modal */}
      {searchModalOpen && (
        <div
          className="search-overlay"
          style={{ top: `${menuTopPosition}px` }}
          onClick={(e) => {
            if (e.target.className === 'search-overlay') {
              setSearchModalOpen(false);
              setSearchQuery("");
            }
          }}
        >
          <div className="search-content">
            <div className="container">
              <div className="search-header">
                <form className="search-form" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-input-btn"
                      onClick={() => setSearchQuery("")}
                      aria-label="검색어 지우기"
                    >
                      ×
                    </button>
                  )}
                  <button type="submit" className="search-submit" aria-label="검색">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </form>
                <button
                  className="search-close"
                  onClick={() => {
                    setSearchModalOpen(false);
                    setSearchQuery("");
                  }}
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>

              <div className="search-body">
                {/* 검색어 입력 시 자동완성 표시 */}
                {searchQuery.trim() ? (
                  <>
                    {/* 연관 검색어 */}
                    <div className="search-section autocomplete-keywords">
                      {filteredKeywords.length > 0 ? (
                        <ul className="autocomplete-list">
                          {filteredKeywords.map((keyword, index) => (
                            <li key={index}>
                              <button
                                className={`autocomplete-keyword ${index === 0 ? 'first' : ''}`}
                                onClick={() => handleSearch(keyword)}
                              >
                                {keyword}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="empty-message">검색 결과가 없습니다.</p>
                      )}
                    </div>

                    {/* 브랜드 */}
                    <div className="search-section autocomplete-brands">
                      <h3>브랜드</h3>
                      {filteredBrands.length > 0 ? (
                        <ul className="brand-list-autocomplete">
                          {filteredBrands.map((brand, index) => (
                            <li key={index}>
                              <Link
                                to={brand.link}
                                className="brand-item"
                                onClick={() => setSearchModalOpen(false)}
                              >
                                {brand.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="empty-message">검색 결과가 없습니다.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* 검색어 없을 때 최근검색어/인기검색어 표시 */}
                    {/* 최근 검색어 */}
                    <div className="search-section recent-searches">
                      <h3>최근검색어</h3>
                      {recentSearches.length === 0 ? (
                        <p className="empty-message">최근 검색어가 없습니다.</p>
                      ) : (
                        <>
                          <ul className="search-list">
                            {recentSearches.map((keyword, index) => (
                              <li key={index}>
                                <button
                                  className="search-keyword"
                                  onClick={() => handleSearch(keyword)}
                                >
                                  {keyword}
                                </button>
                                <button
                                  className="remove-btn"
                                  onClick={() => removeRecentSearch(keyword)}
                                  aria-label="삭제"
                                >
                                  ×
                                </button>
                              </li>
                            ))}
                          </ul>
                          <button
                            className="clear-all-btn"
                            onClick={clearAllRecentSearches}
                          >
                            전체 삭제
                          </button>
                        </>
                      )}
                    </div>

                    {/* 인기 검색어 */}
                    <div className="search-section popular-searches">
                      <div className="section-header">
                        <h3>인기검색어</h3>
                        <div className="header-actions">
                          <span className="update-time">19:00 업데이트</span>
                          <Link to="/ranking" className="view-all">전체보기 &gt;</Link>
                        </div>
                      </div>
                      <ul className="popular-list">
                        {popularSearches.map((item) => (
                          <li key={item.rank}>
                            <span className="rank">{item.rank}</span>
                            <button
                              className="search-keyword"
                              onClick={() => handleSearch(item.keyword)}
                            >
                              {item.keyword}
                            </button>
                            {item.trend === "up" && <span className="trend trend-up">▲</span>}
                            {item.trend === "down" && <span className="trend trend-down">▼</span>}
                            {!item.trend && <span className="trend trend-none">―</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="mobile-logo">
              <img src="https://ext.same-assets.com/947818454/418726284.svg" alt="SSF SHOP" />
            </Link>
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>&times;</button>
          </div>
          <nav className="mobile-nav">
            <ul>
              <li><Link to="/women">여성</Link></li>
              <li><Link to="/men">남성</Link></li>
              <li><Link to="/kids">키즈</Link></li>
              <li><Link to="/luxury">럭셔리</Link></li>
              <li><Link to="/shoes">백&슈즈</Link></li>
              <li><Link to="/sports">스포츠</Link></li>
              <li><Link to="/golf">골프</Link></li>
              <li><Link to="/beauty">뷰티</Link></li>
              <li><Link to="/life">라이프</Link></li>
              <li><Link to="/issue">이슈</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
