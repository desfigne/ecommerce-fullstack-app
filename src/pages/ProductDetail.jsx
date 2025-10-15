import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../styles/Page.css";

function ProductDetail() {
  const location = useLocation();
  const History = useHistory();
  const { product } = location.state || {};

  if (!product) return <h1>잘못된 접근입니다.</h1>;

  return (
    <div className="page">
      <img src={product.image} alt={product.name} style={{ width: "400px", borderRadius: "12px" }} />
      <h1>{product.name}</h1>
      <p>{product.price}원</p>
      <button onClick={() => History(-1)}>뒤로가기</button>
      <button>쿠폰 사용하기</button>
    </div>
  );
}

export default ProductDetail;
