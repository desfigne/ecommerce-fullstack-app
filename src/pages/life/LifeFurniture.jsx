import React from "react";
import "../Page.css";

function LifeFurniture() {
  const products = [
    { id: 1, name: "", desc: "", price: "", img: "/images/라이프/가구/life_furniture1.webp" },
    { id: 2, name: "", desc: "", price: "", img: "/images/라이프/가구/life_furniture2.webp" },
    { id: 3, name: "", desc: "", price: "", img: "/images/라이프/가구/life_furniture3.webp" },
    { id: 4, name: "", desc: "", price: "", img: "/images/라이프/가구/life_furniture4.webp" },
    { id: 5, name: "", desc: "", price: "", img: "/images/라이프/가구/life_furniture5.webp" },
    { id: 6, name: "", desc: "", price: "", img: "/images/라이프/가구/life_furniture6.webp" },
  ];

  return (
    <div className="page">
      <h1>라이프 가구 페이지</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.img} alt={p.name} />
            <h4>{p.name}</h4>
            <p className="desc">{p.desc}</p>
            <p className="price">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LifeFurniture;