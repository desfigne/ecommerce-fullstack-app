// localStorage 기반 주문 관리 헬퍼

export function listOrders() {
  try {
    return JSON.parse(localStorage.getItem("orders")) || [];
  } catch {
    return [];
  }
}

export function updateOrderStatus(id, status) {
  try {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx].status = status;
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  } catch (e) {
    console.error("updateOrderStatus error:", e);
  }
}

export function deleteOrder(id) {
  try {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const updated = orders.filter(o => o.id !== id);
    localStorage.setItem("orders", JSON.stringify(updated));
  } catch (e) {
    console.error("deleteOrder error:", e);
  }
}
