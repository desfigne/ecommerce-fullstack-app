import React from "react";
import { useHistory } from "react-router-dom";

export default function ProductThumb({ product }) {
  const history = useHistory();

  const goDetail = () => {
    const normalized = {
      id: product.id,
      name: product.name || "상품명 없음",
      image: product.image || product.img || "",
      price:
        typeof product.price === "string"
          ? Number(String(product.price).replace(/[^\d]/g, "")) || 0
          : Number(product.price || 0),
      desc: product.desc || "",
    };
    localStorage.setItem("lastProduct", JSON.stringify(normalized));
    history.push(`/product/${normalized.id}`, { product: normalized });
  };

  return (
    <div className="product-thumb" onClick={goDetail} style={{ cursor: "pointer" }}>
      <img src={product.image || product.img} alt={product.name} />
    </div>
  );
}
