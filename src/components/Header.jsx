import React, { useEffect, useState } from "react";
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
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
      try {
        setUser(JSON.parse(localStorage.getItem("loginUser")) || null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <span>🎉 신규 회원 가입시 10,000원 쿠폰 즉시 지급! </span>
        <Link to="/event">자세히 보기 →</Link>
      </div>

      {/* Header */}
      <header className="header">
        {/* User Menu */}
        <div className="user-menu-wrapper">
          <div className="container">
            <div className="user-menu">
              {isLogin ? (
                <>
                  <span>{user?.name}님</span>
                  <span style={{color: '#ddd'}}>|</span>
                  <Link to="/logout">로그아웃</Link>
                </>
              ) : (
                <>
                  <Link to="/login">로그인</Link>
                  <span style={{color: '#ddd'}}>|</span>
                  <Link to="/signup">회원가입</Link>
                </>
              )}
              <span style={{color: '#ddd'}}>|</span>
              <Link to="/mypage">마이페이지</Link>
              <span style={{color: '#ddd'}}>|</span>
              <Link to="/help">고객센터</Link>
            </div>
          </div>
        </div>

        <div className="header-top">
          <div className="container">
            <div className="header-top-inner">
              <Link to="/" className="logo">
                <img src="https://ext.same-assets.com/947818454/418726284.svg" alt="SSF SHOP" />
              </Link>

              <nav className="main-nav">
                <ul>
                  <li className="nav-item">
                    <Link to="/women">여성</Link>
                    <div className="mega-menu">
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
                              <Link to="/brand/8seconds">8seconds</Link>
                              <Link to="/brand/beanpole">BEANPOLE</Link>
                              <Link to="/brand/kuho">KUHO</Link>
                              <Link to="/brand/theory">Theory</Link>
                              <Link to="/brand/cos">COS</Link>
                              <Link to="/brand/beaker">BEAKER</Link>
                              <Link to="/brand/ami">ami</Link>
                              <Link to="/brand/maison-kitsune">Maison Kitsuné</Link>
                              <Link to="/brand/lemaire">LEMAIRE</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/men">남성</Link>
                    <div className="mega-menu">
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
                              <Link to="/brand/8seconds">8seconds</Link>
                              <Link to="/brand/beanpole">BEANPOLE</Link>
                              <Link to="/brand/galaxy">Galaxy</Link>
                              <Link to="/brand/rogatis">Rogatis</Link>
                              <Link to="/brand/juunj">JUUN.J</Link>
                              <Link to="/brand/suitsupply">SUITSUPPLY</Link>
                              <Link to="/brand/homme-plisse">HOMME PLISSÉ</Link>
                              <Link to="/brand/lacoste">LACOSTE</Link>
                              <Link to="/brand/daniel-cremieux">Daniel Cremieux</Link>
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
                  <li><Link to="/special" style={{color: '#7F39FB', fontWeight: 600}}>기획전</Link></li>
                  <li><Link to="/event" style={{color: '#7F39FB', fontWeight: 600}}>이벤트</Link></li>
                </ul>
              </nav>

              <div className="header-actions">
                <button className="search-btn" aria-label="검색" onClick={() => setSearchModalOpen(true)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="wishlist-btn" aria-label="위시리스트">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <Link to="/cart" className="cart-btn" aria-label="장바구니">
                  <span className="cart-count">{cartCount}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Sub Navigation */}
        <div className="brand-nav">
          <div className="container">
            <ul>
              <li><Link to="/brand/10-corso-como"><img src="https://ext.same-assets.com/947818454/451353350.svg" alt="10 CORSO COMO" /></Link></li>
              <li><Link to="/brand/beaker"><img src="https://ext.same-assets.com/947818454/863943049.svg" alt="BEAKER" /></Link></li>
              <li><Link to="/brand/another"><img src="https://ext.same-assets.com/947818454/2516667277.svg" alt="ANOTHER#" /></Link></li>
              <li><Link to="/brands">| 브랜드 A-Z</Link></li>
            </ul>
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
        <div className="search-modal" onClick={(e) => e.target.className === 'search-modal' && setSearchModalOpen(false)}>
          <div className="search-modal-content">
            <button className="close-btn" onClick={() => setSearchModalOpen(false)}>&times;</button>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
              <button type="submit" className="search-submit">검색</button>
            </form>
            <div className="popular-searches">
              <h3>인기 검색어</h3>
              <ul>
                <li><Link to="/search?q=코트">코트</Link></li>
                <li><Link to="/search?q=니트">니트</Link></li>
                <li><Link to="/search?q=가디건">가디건</Link></li>
                <li><Link to="/search?q=원피스">원피스</Link></li>
                <li><Link to="/search?q=백">백</Link></li>
              </ul>
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
