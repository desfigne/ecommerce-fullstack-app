import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(c);
      const init = {};
      c.forEach(i => { init[i.id] = true; });
      setSelected(init);
    } catch {
      setCart([]);
      setSelected({});
    }
  }, []);

  const saveCart = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const toggleOne = (id) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  const allChecked = useMemo(() => cart.length > 0 && cart.every(i => selected[i.id]), [cart, selected]);

  const toggleAll = () => {
    const next = {};
    cart.forEach(i => { next[i.id] = !allChecked; });
    setSelected(next);
  };

  const unitPrice = (p) =>
    typeof p?.price === "string"
      ? Number(String(p.price).replace(/[^\d]/g, "")) || 0
      : Number(p?.price || 0);

  const linePrice = (i) => unitPrice(i.product) * Number(i.qty || 1);

  const inc = (id) => {
    const next = cart.map(i => i.id === id ? { ...i, qty: Math.min(99, (Number(i.qty) || 1) + 1) } : i);
    saveCart(next);
  };

  const dec = (id) => {
    const next = cart.map(i => i.id === id ? { ...i, qty: Math.max(1, (Number(i.qty) || 1) - 1) } : i);
    saveCart(next);
  };

  const changeQty = (id, v) => {
    const n = Math.max(1, Math.min(99, Number(v) || 1));
    const next = cart.map(i => i.id === id ? { ...i, qty: n } : i);
    saveCart(next);
  };

  const removeOne = (id) => {
    const next = cart.filter(i => i.id !== id);
    saveCart(next);
    setSelected(prev => {
      const p = { ...prev };
      delete p[id];
      return p;
    });
  };

  const removeSelected = () => {
    const next = cart.filter(i => !selected[i.id]);
    saveCart(next);
    const ns = {};
    next.forEach(i => { ns[i.id] = true; });
    setSelected(ns);
  };

  const clearAll = () => {
    saveCart([]);
    setSelected({});
  };

  const selectedItems = useMemo(() => cart.filter(i => selected[i.id]), [cart, selected]);

  const totalPrice = useMemo(() => selectedItems.reduce((s, i) => s + linePrice(i), 0), [selectedItems]);

  const proceed = () => {
    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }
    const payload = selectedItems.map(i => ({
      id: i.id,
      product: {
        id: i.product?.id,
        name: i.product?.name || "",
        image: i.product?.image || i.product?.img || "",
        price: unitPrice(i.product)
      },
      size: i.size || "",
      qty: Number(i.qty || 1)
    })).filter(v => v.product.id != null);
    if (payload.length === 0) {
      alert("결제할 상품 데이터가 올바르지 않습니다.");
      return;
    }
    localStorage.setItem("cartCheckout", JSON.stringify(payload));
    history.push("/checkout", { fromCart: true });
  };

  return (
    <div className="cart-wrap">
      <h1 className="cart-title">장바구니</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>장바구니가 비어 있습니다.</p>
          <Link to="/" className="btn">쇼핑하러 가기</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-head">
            <label className="chk">
              <input type="checkbox" checked={allChecked} onChange={toggleAll} />
              <span>전체선택</span>
            </label>
            <div className="cart-head-actions">
              <button className="btn" onClick={removeSelected}>선택삭제</button>
              <button className="btn-danger" onClick={clearAll}>전체삭제</button>
            </div>
          </div>

          <div className="cart-list">
            {cart.map(i => {
              const unit = unitPrice(i.product);
              const sub = linePrice(i);
              return (
                <div className="cart-item" key={i.id}>
                  <label className="chk">
                    <input type="checkbox" checked={!!selected[i.id]} onChange={() => toggleOne(i.id)} />
                  </label>

                  <img className="cart-img" src={i.product?.image || i.product?.img} alt={i.product?.name} />

                  <div className="cart-info">
                    <div className="cart-name">{i.product?.name || "상품"}</div>
                    <div className="cart-meta">사이즈: {i.size}</div>
                    <div className="cart-meta">단가: ₩{unit.toLocaleString()}</div>
                  </div>

                  <div className="cart-qty">
                    <button onClick={() => dec(i.id)}>-</button>
                    <input value={i.qty} onChange={(e) => changeQty(i.id, e.target.value)} />
                    <button onClick={() => inc(i.id)}>+</button>
                  </div>

                  <div className="cart-sub">₩{sub.toLocaleString()}</div>

                  <button className="btn-danger" onClick={() => removeOne(i.id)}>삭제</button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="cart-sum-row">
              <span>선택 상품 금액</span>
              <b>₩{totalPrice.toLocaleString()}</b>
            </div>
            <div className="cart-actions">
              <Link to="/" className="btn">쇼핑 계속하기</Link>
              <button className="pay-btn" onClick={proceed}>선택 상품 결제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
