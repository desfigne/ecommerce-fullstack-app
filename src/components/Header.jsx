import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import "../styles/Page.css";

function Header() {
  const history = useHistory();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [user, setUser] = useState(null);

  const readAuth = useCallback(() => {
    try {
      const u = JSON.parse(localStorage.getItem("loginUser"));
      setUser(u || null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    readAuth();
    try { window.__refreshAuth = readAuth; } catch {}
    return () => {
      if (window.__refreshAuth === readAuth) {
        try { window.__refreshAuth = undefined; } catch {}
      }
    };
  }, [readAuth]);

  useEffect(() => { readAuth(); }, [location, readAuth]);

  useEffect(() => {
    const onFocus = () => readAuth();
    const onCustom = () => readAuth();
    window.addEventListener("focus", onFocus);
    window.addEventListener("auth:changed", onCustom);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("auth:changed", onCustom);
    };
  }, [readAuth]);

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("loginUser");
    readAuth();
    try { window.dispatchEvent(new Event("auth:changed")); } catch {}
    alert("로그아웃되었습니다.");
    history.push("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <Link to="/">SSF 10th</Link>
        </h1>

        <nav className="nav" onMouseLeave={handleMouseLeave}>
          <ul className="nav-list">
            <li className="nav-item" onMouseEnter={() => handleMouseEnter("women")}>
              <NavLink to="/women" className="nav-link">여성</NavLink>
              {activeMenu === "women" && (
                <div className="dropdown">
                  <Link to="/women/new">신상품</Link>
                  <Link to="/women/outer">아우터</Link>
                  <Link to="/women/jacket">재킷</Link>
                  <Link to="/women/knit">니트</Link>
                  <Link to="/women/shirt">셔츠</Link>
                  <Link to="/women/tshirt">티셔츠</Link>
                  <Link to="/women/onepiece">원피스</Link>
                  <Link to="/women/pants">팬츠</Link>
                  <Link to="/women/skirt">스커트</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("men")}>
              <NavLink to="/men" className="nav-link">남성</NavLink>
              {activeMenu === "men" && (
                <div className="dropdown">
                  <Link to="/men/new">신상품</Link>
                  <Link to="/men/suit">정장</Link>
                  <Link to="/men/jacket">재킷</Link>
                  <Link to="/men/shirt">셔츠</Link>
                  <Link to="/men/knit">니트</Link>
                  <Link to="/men/tshirt">티셔츠</Link>
                  <Link to="/men/pants">팬츠</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("kids")}>
              <NavLink to="/kids" className="nav-link">키즈</NavLink>
              {activeMenu === "kids" && (
                <div className="dropdown">
                  <Link to="/kids/new">신상품</Link>
                  <Link to="/kids/boy">남아</Link>
                  <Link to="/kids/girl">여아</Link>
                  <Link to="/kids/baby">베이비</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("luxury")}>
              <NavLink to="/luxury" className="nav-link">럭셔리</NavLink>
              {activeMenu === "luxury" && (
                <div className="dropdown">
                  <Link to="/luxury/new">신상품</Link>
                  <Link to="/luxury/women">여성</Link>
                  <Link to="/luxury/men">남성</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("sports")}>
              <NavLink to="/sports" className="nav-link">스포츠</NavLink>
              {activeMenu === "sports" && (
                <div className="dropdown">
                  <Link to="/sports/new">신상품</Link>
                  <Link to="/sports/outdoor">아웃도어</Link>
                  <Link to="/sports/running">러닝</Link>
                  <Link to="/sports/yoga">요가</Link>
                  <Link to="/sports/fitness">피트니스</Link>
                  <Link to="/sports/tennis">테니스</Link>
                  <Link to="/sports/swim">수영</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("golf")}>
              <NavLink to="/golf" className="nav-link">골프</NavLink>
              {activeMenu === "golf" && (
                <div className="dropdown">
                  <Link to="/golf/new">신상품</Link>
                  <Link to="/golf/women">여성</Link>
                  <Link to="/golf/men">남성</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("beauty")}>
              <NavLink to="/beauty" className="nav-link">뷰티</NavLink>
              {activeMenu === "beauty" && (
                <div className="dropdown">
                  <Link to="/beauty/new">신상품</Link>
                  <Link to="/beauty/skin">스킨케어</Link>
                  <Link to="/beauty/makeup">메이크업</Link>
                  <Link to="/beauty/perfume">향수</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("life")}>
              <NavLink to="/life" className="nav-link">라이프</NavLink>
              {activeMenu === "life" && (
                <div className="dropdown">
                  <Link to="/life/new">신상품</Link>
                  <Link to="/life/furniture">가구</Link>
                  <Link to="/life/pet">반려동물</Link>
                  <Link to="/life/car">카/캠핑</Link>
                </div>
              )}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("outlet")}>
              <NavLink to="/outlet" className="nav-link">아울렛</NavLink>
              {activeMenu === "outlet" && (
                <div className="dropdown">
                  <Link to="/outlet/women">여성</Link>
                  <Link to="/outlet/men">남성</Link>
                  <Link to="/outlet/kids">키즈</Link>
                  <Link to="/outlet/luxury">럭셔리</Link>
                  <Link to="/outlet/shoes">슈즈</Link>
                  <Link to="/outlet/sports">스포츠</Link>
                  <Link to="/outlet/golf">골프</Link>
                  <Link to="/outlet/life">라이프</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="user-menu">
          {user ? (
            <>
              <span className="user-name">{user.name}님</span>
              <Link to="/orders" className="user-link">주문내역</Link>
              <Link to="/cart" className="user-link">🛒 장바구니</Link>
              <button onClick={handleLogout} className="user-btn">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="user-link">로그인</Link>
              <Link to="/signup" className="user-btn">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
