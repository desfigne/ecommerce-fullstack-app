import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listOrders, updateOrderStatus, deleteOrder } from "../../api/orders";
import { getAuth } from "../../api/auth";
import "../../styles/AdminDashboard.css";

export default function AdminOrders() {
  const history = useHistory();
  const [q, setQ] = useState("");
  const [orders, setOrders] = useState(listOrders());
  const auth = getAuth();

  useEffect(() => {
    if (!auth || auth.role !== "admin") history.replace("/login");
  }, [auth, history]);

  const refresh = () => setOrders(listOrders());

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((o) =>
      (o.buyer?.email || "").toLowerCase().includes(term) ||
      (o.buyer?.name || "").toLowerCase().includes(term) ||
      (o.product?.name || "").toLowerCase().includes(term)
    );
  }, [orders, q]);

  const formatDate = (ms) => {
    if (!ms) return "-";
    const d = new Date(ms);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day} ${hh}:${mm}`;
  };

  const mark = (id, status) => {
    updateOrderStatus(id, status);
    refresh();
  };

  const remove = (id) => {
    if (window.confirm("정말로 이 주문을 완전히 삭제하시겠습니까?")) {
      deleteOrder(id);
      refresh();
    }
  };

  if (!auth || auth.role !== "admin") return null;

  return (
    <div className="admin-wrap">
      <div className="admin-topbar">
        <div className="admin-title">주문 관리</div>
        <div className="admin-actions">
          <Link className="btn" to="/admin">대시보드</Link>
          <Link className="btn" to="/">홈으로</Link>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <div className="admin-card-title">주문 목록</div>
          <div className="admin-controls">
            <input
              className="admin-input"
              placeholder="주문자/이메일/상품 검색"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn" onClick={refresh}>새로고침</button>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "32px" }}>#</th>
                <th style={{ width: "120px" }}>주문일시</th>
                <th>주문자</th>
                <th>이메일</th>
                <th>상품</th>
                <th style={{ width: "80px" }}>사이즈</th>
                <th style={{ width: "70px" }}>수량</th>
                <th style={{ width: "120px" }}>금액</th>
                <th style={{ width: "100px" }}>상태</th>
                <th style={{ width: "280px" }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="empty">주문이 없습니다.</td>
                </tr>
              ) : (
                filtered.map((o, i) => (
                  <tr key={o.id}>
                    <td>{i + 1}</td>
                    <td>{formatDate(o.createdAt)}</td>
                    <td>{o.buyer?.name || "-"}</td>
                    <td>{o.buyer?.email || "-"}</td>
                    <td>{o.product?.name}</td>
                    <td>{o.option?.size}</td>
                    <td>{o.qty}</td>
                    <td>{o.total}원</td>
                    <td>{o.status}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button className="btn" onClick={() => mark(o.id, "결제완료")}>결제완료</button>
                        <button className="btn" onClick={() => mark(o.id, "배송중")}>배송중</button>
                        <button className="btn" onClick={() => mark(o.id, "배송완료")}>배송완료</button>
                        <button className="btn-warning" onClick={() => mark(o.id, "주문취소")}>주문취소</button>
                        <button className="btn-danger" onClick={() => remove(o.id)}>삭제</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
