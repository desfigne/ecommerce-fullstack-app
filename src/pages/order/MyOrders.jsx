import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function MyOrders() {
  const history = useHistory();
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      return [];
    }
  });
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loginUser")) || null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem("orders")) || []);
    } catch {
      setOrders([]);
    }
  }, []);

  const mine = useMemo(() => {
    if (!user?.email) return [];
    return orders.filter((o) => (o.buyer?.email || "") === user.email);
  }, [orders, user]);

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

  if (!user) {
    return (
      <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>주문내역</h1>
        <p>로그인이 필요합니다.</p>
        <button
          onClick={() => history.push("/login")}
          style={{
            marginTop: 12,
            border: "1px solid #ddd",
            background: "#fff",
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          로그인 하러가기
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>주문내역</h1>

      {mine.length === 0 ? (
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 20 }}>
          <div>주문 내역이 없습니다.</div>
          <Link
            to="/"
            style={{
              display: "inline-block",
              marginTop: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "8px 12px",
              textDecoration: "none",
              color: "#111",
            }}
          >
            쇼핑 계속하기
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {mine.map((o) => {
            const imgSrc = o.product?.image || o.product?.img || "/images/noimg.png";
            const price = formatPrice(o.total || o.product?.price);
            return (
              <div
                key={o.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: 12,
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 160px",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <img
                  src={imgSrc}
                  alt={o.product?.name}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #eee",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700 }}>{o.product?.name || "상품명 없음"}</div>
                  <div style={{ color: "#555", fontSize: 14, marginTop: 4 }}>
                    {formatDate(o.createdAt || o.createdISO)}
                  </div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>사이즈: {o.option?.size || "Free"}</div>
                  <div style={{ fontSize: 14 }}>수량: {o.qty || 1}</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>상태: {o.status || "결제완료"}</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>결제수단: {o.payMethod || "-"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{price}</div>
                  <Link
                    to={`/product/${o.product?.id}`}
                    style={{
                      border: "1px solid #ddd",
                      background: "#fff",
                      borderRadius: 8,
                      padding: "8px 12px",
                      textDecoration: "none",
                      color: "#111",
                    }}
                  >
                    상품보기
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
