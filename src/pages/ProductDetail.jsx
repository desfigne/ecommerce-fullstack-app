import React, { useMemo, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

export default function ProductDetail() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const fromState = location.state?.product || null;

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const product = useMemo(() => {
    if (fromState && fromState.id) return fromState;
    try { return JSON.parse(localStorage.getItem("lastProduct")) || null; } catch { return null; }
  }, [fromState, id]);

  const isAdmin = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("auth"))?.role === "admin"; } catch { return false; }
  }, []);

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
    const item = {
      id: `${product.id}-${size}`,
      product: {
        id: product.id,
        name: product.name || "",
        image: product.image || product.img,
        price: normalizedPrice,
      },
      size,
      qty: Number(qty),
    };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 담았습니다.");
  };

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 20px", position: "relative" }}>
      {isAdmin && (
        <Link
          to="/admin/orders"
          style={{
            position: "absolute",
            right: 20,
            top: -8,
            border: "1px solid #ddd",
            background: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            textDecoration: "none",
            color: "#111",
            fontSize: 14,
          }}
        >
          주문관리
        </Link>
      )}

      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>상품 상세</h1>

      {!product ? (
        <div>상품 정보를 찾을 수 없습니다. 목록에서 이미지를 클릭해 다시 들어와 주세요.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 24 }}>
          <div>
            <img
              src={product.image || product.img}
              alt={product.name}
              style={{ width: "100%", borderRadius: 12 }}
            />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              {product.name || "상품명"}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              {normalizedPrice ? `₩${normalizedPrice.toLocaleString()}` : ""}
            </div>

            <div style={{ display: "grid", gap: 12, width: 320 }}>
              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ fontSize: 14 }}>사이즈</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  style={{ border: "1px solid #ddd", borderRadius: 8, padding: "10px" }}
                >
                  <option value="">선택하세요</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ fontSize: 14 }}>수량</span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={qty}
                  onChange={(e) => setQty(clampQty(Number(e.target.value)))}
                  style={{ border: "1px solid #ddd", borderRadius: 8, padding: "10px" }}
                />
              </label>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={addToCart}
                  style={{
                    background: "#444",
                    color: "#fff",
                    border: 0,
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontWeight: 700,
                    flex: 1,
                  }}
                >
                  장바구니 담기
                </button>
                <button
                  onClick={goCheckout}
                  style={{
                    background: "#111",
                    color: "#fff",
                    border: 0,
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontWeight: 700,
                    flex: 1,
                  }}
                >
                  주문하기
                </button>
              </div>

              <Link
                to="/cart"
                style={{
                  marginTop: 4,
                  display: "inline-block",
                  textDecoration: "none",
                  color: "#111",
                  fontSize: 14,
                }}
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
