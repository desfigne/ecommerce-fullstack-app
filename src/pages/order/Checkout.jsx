import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import "../../styles/Page.css";

export default function Checkout() {
  const history = useHistory();
  const location = useLocation();

  const [payment, setPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [items, setItems] = useState([]);

  const auth = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("loginUser")) || null; } catch { return null; }
  }, []);

  useEffect(() => {
    const ok = localStorage.getItem("isLogin") === "true" && !!auth;
    if (!ok) {
      alert("로그인이 필요한 서비스입니다.");
      history.replace("/login");
      return;
    }

    // 1) cartCheckout이 있으면 '장바구니 결제'로 간주 (상태 유실/새로고침 대비)
    let cartSel = [];
    try { cartSel = JSON.parse(localStorage.getItem("cartCheckout")) || []; } catch {}
    if (Array.isArray(cartSel) && cartSel.length > 0) {
      const normalized = cartSel
        .map(c => ({
          product: {
            id: c.product?.id,
            name: c.product?.name || "",
            image: c.product?.image || c.product?.img || "",
            price: typeof c.product?.price === "string"
              ? Number(String(c.product.price).replace(/[^\d]/g, "")) || 0
              : Number(c.product?.price || 0)
          },
          size: c.size || "",
          qty: Number(c.qty || 1)
        }))
        .filter(v => v.product?.id);
      if (normalized.length === 0) {
        alert("결제할 장바구니 상품이 없습니다.");
        history.replace("/cart");
        return;
      }
      setItems(normalized);
      return;
    }

    // 2) 장바구니 데이터가 없으면 단일상품 결제 경로 사용
    let order = location.state?.order || null;
    if (!order) {
      try { order = JSON.parse(localStorage.getItem("pendingOrder")) || null; } catch {}
    }
    if (!order || !order.product?.id) {
      alert("주문 정보가 없습니다. 다시 상품을 선택해 주세요.");
      history.replace("/");
      return;
    }
    const normalizedOne = [{
      product: {
        id: order.product.id,
        name: order.product.name || "",
        image: order.product.image || order.product.img || "",
        price: typeof order.product.price === "string"
          ? Number(String(order.product.price).replace(/[^\d]/g, "")) || 0
          : Number(order.product.price || 0)
      },
      size: order.size || "",
      qty: Number(order.qty || 1)
    }];
    setItems(normalizedOne);
  }, [auth, history, location.state]);

  const total = useMemo(
    () => items.reduce((s, it) => s + (Number(it.product.price || 0) * Number(it.qty || 1)), 0),
    [items]
  );

  const handlePay = () => {
    if (items.length === 0) { alert("주문 정보가 없습니다."); return; }
    if (!payment) { alert("결제수단을 선택해주세요."); return; }

    setShowQR(true);
    setIsProcessing(true);

    setTimeout(() => {
      const now = Date.now();
      const orderRows = items.map((it) => ({
        id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
        buyer: { name: auth?.name || "비회원", email: auth?.email || "" },
        product: {
          id: it.product.id,
          name: it.product.name,
          image: it.product.image,
          price: Number(it.product.price || 0)
        },
        option: { size: it.size || "Free" },
        qty: Number(it.qty || 1),
        total: Number(it.product.price || 0) * Number(it.qty || 1),
        status: "결제완료",
        createdAt: now,
        payMethod: payment
      }));

      const cur = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...orderRows, ...cur]));

      // 장바구니 결제였다면, 결제한 항목만 장바구니에서 제거
      const paidKeys = new Set(items.map(it => `${it.product.id}-${it.size || "Free"}`));
      const origin = JSON.parse(localStorage.getItem("cart") || "[]");
      const remain = origin.filter(i => !paidKeys.has(`${i.product?.id}-${i.size || "Free"}`));
      localStorage.setItem("cart", JSON.stringify(remain));
      localStorage.removeItem("cartCheckout");

      // 단일 결제 경로 정리
      localStorage.removeItem("pendingOrder");

      alert("결제가 완료되었습니다!");
      history.replace("/orders");
    }, 5000);
  };

  const qrSrc =
    payment === "네이버페이" ? "/icons/qr_naver.png"
    : payment === "카카오페이" ? "/icons/qr_kakao.png"
    : payment === "토스페이" ? "/icons/qr_toss.png"
    : "/icons/qr.png";

  return (
    <div className="page checkout-page">
      <h1>결제 페이지</h1>
      <div className="checkout-box">
        {!showQR ? (
          <>
            {items.length > 0 ? (
              <div style={{ textAlign: "left", marginBottom: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>주문 상품</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {items.map((it, idx) => (
                    <div key={idx} style={{ display: "grid", gridTemplateColumns: "60px 1fr 140px", gap: 10, alignItems: "center" }}>
                      <img src={it.product.image} alt={it.product.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{it.product.name || "상품"}</div>
                        <div style={{ color: "#555", fontSize: 13 }}>사이즈 {it.size || "-" } · 수량 {it.qty}</div>
                      </div>
                      <div style={{ textAlign: "right", fontWeight: 700 }}>
                        ₩{(Number(it.product.price||0)*Number(it.qty||1)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: "1px solid #eee" }}>
                  <span style={{ fontWeight: 600 }}>총 결제금액</span>
                  <span style={{ fontWeight: 800 }}>₩{total.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 18 }}>주문 정보가 없습니다. <Link to="/">홈으로</Link></div>
            )}

            <h2>결제수단 선택</h2>
            <div className="payment-methods">
              <label className={`payment-option ${payment === "네이버페이" ? "active" : ""}`}>
                <input type="radio" name="payment" value="네이버페이" onChange={(e) => setPayment(e.target.value)} disabled={isProcessing} />
                <img src="/icons/naverpay.png" alt="네이버페이" />
                네이버페이
              </label>
              <label className={`payment-option ${payment === "카카오페이" ? "active" : ""}`}>
                <input type="radio" name="payment" value="카카오페이" onChange={(e) => setPayment(e.target.value)} disabled={isProcessing} />
                <img src="/icons/kakaopay.png" alt="카카오페이" />
                카카오페이
              </label>
              <label className={`payment-option ${payment === "토스페이" ? "active" : ""}`}>
                <input type="radio" name="payment" value="토스페이" onChange={(e) => setPayment(e.target.value)} disabled={isProcessing} />
                <img src="/icons/tosspay.png" alt="토스페이" />
                토스페이
              </label>
            </div>

            <button className="pay-btn" onClick={handlePay} disabled={isProcessing || items.length === 0}>
              {isProcessing ? "결제 중..." : "결제하기"}
            </button>
          </>
        ) : (
          <div className="qr-box">
            <h2>{payment} 결제 진행 중...</h2>
            <img src="/icons/qr.png" alt="QR 결제" className="qr-image" />
            <p>결제 중입니다. 잠시만 기다려주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}