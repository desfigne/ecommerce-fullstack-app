import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const fromState = location.state?.product || null;

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [isWished, setIsWished] = useState(false);

  const product = useMemo(() => {
    if (fromState && fromState.id) return fromState;
    try { return JSON.parse(localStorage.getItem("lastProduct")) || null; } catch { return null; }
  }, [fromState, id]);

  const isAdmin = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("auth"))?.role === "admin"; } catch { return false; }
  }, []);

  // 찜 상태 확인
  useEffect(() => {
    if (!product?.id) return;
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const wished = wishlist.some(item => item.id === product.id);
      setIsWished(wished);
    } catch {
      setIsWished(false);
    }
  }, [product]);

  const clampQty = (v) => (v < 1 ? 1 : v > 99 ? 99 : v);

  const normalizedPrice =
    typeof product?.price === "string"
      ? Number(String(product.price).replace(/[^\d]/g, "")) || 0
      : Number(product?.price || 0);

  const goCheckout = () => {
    if (!product) { alert("상품 정보를 찾을 수 없습니다."); return; }
    if (!size) { alert("사이즈를 선택해 주세요."); return; }
    const payload = {
      product: {
        id: product.id,
        name: product.name || "",
        image: product.image || product.img,
        price: normalizedPrice,
        desc: product.desc || "",
      },
      size,
      qty: Number(qty),
    };
    localStorage.setItem("pendingOrder", JSON.stringify(payload));
    history.push("/checkout", { order: payload });
  };

  const addToCart = () => {
    if (!product) { alert("상품 정보를 찾을 수 없습니다."); return; }
    if (!size) { alert("사이즈를 선택해 주세요."); return; }

    try {
      const itemId = `${product.id}-${size}`;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // 동일한 상품과 사이즈가 이미 있는지 확인
      const existingIndex = cart.findIndex(item => item.id === itemId);

      if (existingIndex !== -1) {
        // 이미 있는 경우: 수량 증가 (최대 99개)
        const currentQty = Number(cart[existingIndex].qty) || 1;
        const addQty = Number(qty) || 1;
        const newQty = Math.min(99, currentQty + addQty);

        cart[existingIndex].qty = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));

        alert(`장바구니 수량이 ${newQty}개로 업데이트되었습니다.`);
      } else {
        // 없는 경우: 새 항목 추가
        const newItem = {
          id: itemId,
          product: {
            id: product.id,
            name: product.name || "",
            image: product.image || product.img,
            price: normalizedPrice,
          },
          size,
          qty: Number(qty) || 1,
        };
        cart.push(newItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));

        alert("장바구니에 담았습니다.");
      }
    } catch (err) {
      console.error("장바구니 추가 오류:", err);
      alert("장바구니에 담는 중 오류가 발생했습니다.");
    }
  };

  const toggleWish = () => {
    if (!product) { alert("상품 정보를 찾을 수 없습니다."); return; }

    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const existingIndex = wishlist.findIndex(item => item.id === product.id);

      if (existingIndex !== -1) {
        // 이미 찜한 상품: 제거
        wishlist.splice(existingIndex, 1);
        setIsWished(false);
        alert("찜 목록에서 제거되었습니다.");
      } else {
        // 새로 찜하기
        const wishItem = {
          id: product.id,
          name: product.name || "",
          image: product.image || product.img,
          price: normalizedPrice,
          addedAt: Date.now(),
        };
        wishlist.push(wishItem);
        setIsWished(true);
        alert("찜 목록에 추가되었습니다.");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      // 찜 목록 업데이트 이벤트 발생
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      alert("찜 목록 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="product-detail-container">
      {isAdmin && (
        <Link
          to={{ pathname: "/mypage", state: { activeTab: "admin-orders" } }}
          className="admin-link"
        >
          주문관리
        </Link>
      )}

      <h1 className="product-detail-title">상품 상세</h1>

      {!product ? (
        <div>상품 정보를 찾을 수 없습니다. 목록에서 이미지를 클릭해 다시 들어와 주세요.</div>
      ) : (
        <div className="product-detail-grid">
          <div>
            <img
              src={product.image || product.img}
              alt={product.name}
              className="product-image"
            />
          </div>
          <div>
            <div className="product-name-section">
              <div className="product-name">
                {product.name || "상품명"}
              </div>
              <button
                onClick={toggleWish}
                className="wishlist-button"
                title={isWished ? "찜 취소" : "찜하기"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isWished ? "#ff4444" : "none"}>
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke={isWished ? "#ff4444" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="product-price">
              {normalizedPrice ? `₩${normalizedPrice.toLocaleString()}` : ""}
            </div>

            <div className="product-form-container">
              <label className="form-label">
                <span className="form-label-text">사이즈</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="form-select"
                >
                  <option value="">선택하세요</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </label>

              <label className="form-label">
                <span className="form-label-text">수량</span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={qty}
                  onChange={(e) => setQty(clampQty(Number(e.target.value)))}
                  className="form-input"
                />
              </label>

              <div className="button-group">
                <button
                  onClick={addToCart}
                  className="cart-button"
                >
                  장바구니 담기
                </button>
                <button
                  onClick={goCheckout}
                  className="checkout-button"
                >
                  주문하기
                </button>
              </div>

              <Link
                to="/cart"
                className="cart-link"
              >
                장바구니로 이동
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
