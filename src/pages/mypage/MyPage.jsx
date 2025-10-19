import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { updateOrderStatus, deleteOrder } from "../../api/orders";
import "./MyPage.css";


export default function MyPage() {
  const history = useHistory();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "info");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");


  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loginUser")) || null;
    } catch {
      return null;
    }
  }, []);

  const isAdmin = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("auth"))?.role === "admin";
    } catch {
      return false;
    }
  }, []);


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLogin") === "true";
    if (!isLoggedIn || !user) {
      alert("로그인이 필요합니다.");
      window.location.href = "/#/login";
      return;
    }


    // 주문내역 불러오기
    try {
      const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
      if (isAdmin) {
        setAllOrders(ordersData);
      } else {
        const myOrders = ordersData.filter((o) => o.buyer?.email === user.email);
        setOrders(myOrders);
      }
    } catch {
      setOrders([]);
      setAllOrders([]);
    }


    // 관리자인 경우 전체 회원 목록 로드
    if (isAdmin) {
      try {
        const usersData = JSON.parse(localStorage.getItem("users")) || [];
        setAllUsers(usersData);
      } catch {
        setAllUsers([]);
      }
    }


    // 찜 목록 불러오기
    loadWishlist();


    // 찜 목록 업데이트 이벤트 리스너
    const handleWishlistUpdate = () => {
      loadWishlist();
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);


    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, [user, history, isAdmin]);


  const loadWishlist = () => {
    try {
      const list = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(list);
    } catch {
      setWishlist([]);
    }
  };


  const formatDate = (msOrIso) => {
    if (!msOrIso) return "-";
    const d = typeof msOrIso === "number" ? new Date(msOrIso) : new Date(msOrIso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day} ${hh}:${mm}`;
  };


  const formatPrice = (v) => {
    if (!v) return "0원";
    const num = typeof v === "string" ? Number(v.replace(/[^\d]/g, "")) : Number(v);
    return "₩" + num.toLocaleString();
  };


  const removeFromWishlist = (productId) => {
    try {
      const updated = wishlist.filter(item => item.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlist(updated);
      window.dispatchEvent(new Event("wishlistUpdated"));
      alert("찜 목록에서 제거되었습니다.");
    } catch {
      alert("찜 목록 제거 중 오류가 발생했습니다.");
    }
  };

  // 관리자 기능: 회원 삭제
  const deleteUser = (email) => {
    if (!window.confirm(`${email} 회원을 정말 삭제하시겠습니까?`)) return;

    try {
      const updated = allUsers.filter(u => u.email !== email);
      localStorage.setItem("users", JSON.stringify(updated));
      setAllUsers(updated);
      alert("회원이 삭제되었습니다.");
    } catch {
      alert("회원 삭제 중 오류가 발생했습니다.");
    }
  };

  // 관리자 기능: 회원 목록 새로고침
  const refreshUsers = () => {
    try {
      const usersData = JSON.parse(localStorage.getItem("users")) || [];
      setAllUsers(usersData);
      alert("회원 목록이 새로고침 되었습니다.");
    } catch {
      alert("회원 목록 로드 중 오류가 발생했습니다.");
    }
  };

  // 관리자 기능: 주문 목록 새로고침
  const refreshOrders = () => {
    try {
      const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
      setAllOrders(ordersData);
      alert("주문 목록이 새로고침 되었습니다.");
    } catch {
      alert("주문 목록 로드 중 오류가 발생했습니다.");
    }
  };

  // 검색 필터링된 회원 목록
  const filteredUsers = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return allUsers;
    return allUsers.filter(u =>
      (u.email || "").toLowerCase().includes(term) ||
      (u.name || "").toLowerCase().includes(term)
    );
  }, [allUsers, searchQuery]);

  // 검색 필터링된 주문 목록
  const filteredOrders = useMemo(() => {
    const term = orderSearchQuery.trim().toLowerCase();
    if (!term) return allOrders;
    return allOrders.filter(o =>
      (o.buyer?.email || "").toLowerCase().includes(term) ||
      (o.buyer?.name || "").toLowerCase().includes(term) ||
      (o.product?.name || "").toLowerCase().includes(term)
    );
  }, [allOrders, orderSearchQuery]);

  // 관리자 기능: 주문 상태 업데이트
  const updateStatus = (id, status) => {
    updateOrderStatus(id, status);
    refreshOrders();
  };

  // 관리자 기능: 주문 삭제
  const removeOrder = (id) => {
    if (!window.confirm("정말로 이 주문을 완전히 삭제하시겠습니까?")) return;
    deleteOrder(id);
    refreshOrders();
  };


  if (!user) {
    return null;
  }


  return (
    <div className="mypage">
      <div className="mypage-container">
        <div className="mypage-header">
          <h1>마이페이지</h1>
          <p className="welcome-message">{user.name}님, 환영합니다!</p>
        </div>


        <div className="mypage-content">
          {/* 사이드바 */}
          <aside className="mypage-sidebar">
            <nav className="mypage-nav">
              <button
                className={`nav-item ${activeTab === "info" ? "active" : ""}`}
                onClick={() => setActiveTab("info")}
              >
                회원정보
              </button>
              <button
                className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                주문내역
              </button>
              <button
                className={`nav-item ${activeTab === "wishlist" ? "active" : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                찜한 상품
              </button>
              <button
                className={`nav-item ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                리뷰 관리
              </button>
              {isAdmin && (
                <>
                  <div style={{ borderTop: "1px solid var(--border-color)", margin: "16px 0" }} />
                  <button
                    className={`nav-item ${activeTab === "admin-users" ? "active" : ""}`}
                    onClick={() => setActiveTab("admin-users")}
                  >
                    회원 관리 (관리자)
                  </button>
                  <button
                    className={`nav-item ${activeTab === "admin-orders" ? "active" : ""}`}
                    onClick={() => setActiveTab("admin-orders")}
                  >
                    주문 관리 (관리자)
                  </button>
                </>
              )}
            </nav>
          </aside>


          {/* 메인 콘텐츠 */}
          <main className="mypage-main">
            {/* 회원정보 탭 */}
            {activeTab === "info" && (
              <div className="tab-content">
                <h2>회원정보</h2>
                <div className="info-card">
                  <div className="info-row">
                    <span className="info-label">이름</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">이메일</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">전화번호</span>
                    <span className="info-value">{user.phone || "-"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">가입일</span>
                    <span className="info-value">
                      {user.createdAt ? formatDate(user.createdAt) : "-"}
                    </span>
                  </div>
                </div>
                <button className="btn-primary">회원정보 수정</button>
              </div>
            )}


            {/* 주문내역 탭 */}
            {activeTab === "orders" && (
              <div className="tab-content">
                <h2>주문내역</h2>
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <p>주문 내역이 없습니다.</p>
                    <Link to="/" className="btn-primary">
                      쇼핑 계속하기
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => {
                      const imgSrc = order.product?.image || order.product?.img || "/images/noimg.png";
                      const price = formatPrice(order.total || order.product?.price);
                      return (
                        <div key={order.id} className="order-item">
                          <img src={imgSrc} alt={order.product?.name} className="order-image" />
                          <div className="order-info">
                            <h3 className="order-name">{order.product?.name || "상품명 없음"}</h3>
                            <p className="order-date">{formatDate(order.createdAt || order.createdISO)}</p>
                            <p className="order-detail">사이즈: {order.option?.size || "Free"}</p>
                            <p className="order-detail">수량: {order.qty || 1}</p>
                            <p className="order-status">상태: {order.status || "결제완료"}</p>
                            <p className="order-detail">결제수단: {order.payMethod || "-"}</p>
                          </div>
                          <div className="order-actions">
                            <p className="order-price">{price}</p>
                            <Link to={`/product/${order.product?.id}`} className="btn-secondary">
                              상품보기
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}


            {/* 찜한 상품 탭 */}
            {activeTab === "wishlist" && (
              <div className="tab-content">
                <h2>찜한 상품</h2>
                {wishlist.length === 0 ? (
                  <div className="empty-state">
                    <p>찜한 상품이 없습니다.</p>
                    <Link to="/" className="btn-primary">
                      상품 둘러보기
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {wishlist.map((item) => {
                      const imgSrc = item.image || item.img || "/images/noimg.png";
                      const price = formatPrice(item.price);
                      return (
                        <div key={item.id} className="order-item">
                          <img src={imgSrc} alt={item.name} className="order-image" />
                          <div className="order-info">
                            <h3 className="order-name">{item.name || "상품명 없음"}</h3>
                            <p className="order-price" style={{ marginTop: 8 }}>{price}</p>
                            {item.addedAt && (
                              <p className="order-date" style={{ fontSize: 12, color: "#888" }}>
                                찜한 날짜: {formatDate(item.addedAt)}
                              </p>
                            )}
                          </div>
                          <div className="order-actions">
                            <Link to={`/product/${item.id}`} state={{ product: item }} className="btn-primary">
                              상품보기
                            </Link>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="btn-secondary"
                              style={{ marginTop: 8 }}
                            >
                              찜 해제
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}


            {/* 리뷰 관리 탭 */}
            {activeTab === "reviews" && (
              <div className="tab-content">
                <h2>리뷰 관리</h2>
                <div className="empty-state">
                  <p>작성한 리뷰가 없습니다.</p>
                  <Link to="/orders" className="btn-primary">
                    주문내역에서 리뷰 작성하기
                  </Link>
                </div>
              </div>
            )}

            {/* 관리자 - 회원 관리 탭 */}
            {activeTab === "admin-users" && isAdmin && (
              <div className="tab-content">
                <h2>회원 관리</h2>
                <div style={{ marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="이메일 또는 이름 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "14px"
                    }}
                  />
                  <button onClick={refreshUsers} className="btn-primary">
                    새로고침
                  </button>
                </div>

                {filteredUsers.length === 0 ? (
                  <div className="empty-state">
                    <p>회원이 없습니다.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      backgroundColor: "white",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden"
                    }}>
                      <thead>
                        <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>#</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>이메일</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>이름</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>가입일</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>권한</th>
                          <th style={{ padding: 12, textAlign: "center", borderBottom: "1px solid var(--border-color)" }}>관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((u, i) => (
                          <tr key={u.email} style={{ borderBottom: "1px solid var(--border-color)" }}>
                            <td style={{ padding: 12 }}>{i + 1}</td>
                            <td style={{ padding: 12 }}>{u.email}</td>
                            <td style={{ padding: 12 }}>{u.name}</td>
                            <td style={{ padding: 12 }}>{formatDate(u.joinedAt)}</td>
                            <td style={{ padding: 12 }}>{u.role || "user"}</td>
                            <td style={{ padding: 12, textAlign: "center" }}>
                              <button
                                onClick={() => deleteUser(u.email)}
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: "var(--color-danger)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "var(--radius-sm)",
                                  cursor: "pointer",
                                  fontSize: "13px"
                                }}
                              >
                                삭제
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* 관리자 - 주문 관리 탭 */}
            {activeTab === "admin-orders" && isAdmin && (
              <div className="tab-content">
                <h2>주문 관리</h2>
                <div style={{ marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="주문자/이메일/상품 검색"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "14px"
                    }}
                  />
                  <button onClick={refreshOrders} className="btn-primary">
                    새로고침
                  </button>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="empty-state">
                    <p>주문 내역이 없습니다.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      backgroundColor: "white",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden"
                    }}>
                      <thead>
                        <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)", width: "32px" }}>#</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)", width: "120px" }}>주문일시</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>주문자</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>이메일</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)" }}>상품</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)", width: "80px" }}>사이즈</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)", width: "70px" }}>수량</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)", width: "120px" }}>금액</th>
                          <th style={{ padding: 12, textAlign: "left", borderBottom: "1px solid var(--border-color)", width: "100px" }}>상태</th>
                          <th style={{ padding: 12, textAlign: "center", borderBottom: "1px solid var(--border-color)", width: "280px" }}>관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((o, i) => (
                          <tr key={o.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                            <td style={{ padding: 12 }}>{i + 1}</td>
                            <td style={{ padding: 12 }}>{formatDate(o.createdAt || o.createdISO)}</td>
                            <td style={{ padding: 12 }}>{o.buyer?.name || "-"}</td>
                            <td style={{ padding: 12 }}>{o.buyer?.email || "-"}</td>
                            <td style={{ padding: 12 }}>{o.product?.name || "-"}</td>
                            <td style={{ padding: 12 }}>{o.option?.size || "Free"}</td>
                            <td style={{ padding: 12 }}>{o.qty || 1}</td>
                            <td style={{ padding: 12 }}>{formatPrice(o.total || o.product?.price)}</td>
                            <td style={{ padding: 12 }}>{o.status || "결제완료"}</td>
                            <td style={{ padding: 12 }}>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                                <button
                                  onClick={() => updateStatus(o.id, "결제완료")}
                                  style={{
                                    padding: "4px 8px",
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "var(--radius-sm)",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  결제완료
                                </button>
                                <button
                                  onClick={() => updateStatus(o.id, "배송중")}
                                  style={{
                                    padding: "4px 8px",
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "var(--radius-sm)",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  배송중
                                </button>
                                <button
                                  onClick={() => updateStatus(o.id, "배송완료")}
                                  style={{
                                    padding: "4px 8px",
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "var(--radius-sm)",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  배송완료
                                </button>
                                <button
                                  onClick={() => updateStatus(o.id, "주문취소")}
                                  style={{
                                    padding: "4px 8px",
                                    backgroundColor: "#ff9800",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "var(--radius-sm)",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  주문취소
                                </button>
                                <button
                                  onClick={() => removeOrder(o.id)}
                                  style={{
                                    padding: "4px 8px",
                                    backgroundColor: "var(--color-danger)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "var(--radius-sm)",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                  }}
                                >
                                  삭제
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
