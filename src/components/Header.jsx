import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import "../styles/Page.css";
import { NAV } from "../data/navData";

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

  // ⬇️ 공통 드롭다운 렌더러 (기존 .dropdown 마크업 유지)
  const renderDropdown = (key) => {
    const items = NAV?.[key];
    if (!items || items.length === 0) return null;
    return (
      <div className="dropdown">
        {items.map((it) => (
          <Link key={it.to} to={it.to}>{it.label}</Link>
        ))}
      </div>
    );
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
              {activeMenu === "women" && renderDropdown("women")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("men")}>
              <NavLink to="/men" className="nav-link">남성</NavLink>
              {activeMenu === "men" && renderDropdown("men")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("kids")}>
              <NavLink to="/kids" className="nav-link">키즈</NavLink>
              {activeMenu === "kids" && renderDropdown("kids")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("luxury")}>
              <NavLink to="/luxury" className="nav-link">럭셔리</NavLink>
              {activeMenu === "luxury" && renderDropdown("luxury")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("sports")}>
              <NavLink to="/sports" className="nav-link">스포츠</NavLink>
              {activeMenu === "sports" && renderDropdown("sports")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("golf")}>
              <NavLink to="/golf" className="nav-link">골프</NavLink>
              {activeMenu === "golf" && renderDropdown("golf")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("beauty")}>
              <NavLink to="/beauty" className="nav-link">뷰티</NavLink>
              {activeMenu === "beauty" && renderDropdown("beauty")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("life")}>
              <NavLink to="/life" className="nav-link">라이프</NavLink>
              {activeMenu === "life" && renderDropdown("life")}
            </li>

            <li className="nav-item" onMouseEnter={() => handleMouseEnter("outlet")}>
              <NavLink to="/outlet" className="nav-link">아울렛</NavLink>
              {activeMenu === "outlet" && renderDropdown("outlet")}
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
