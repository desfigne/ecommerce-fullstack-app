import React from "react";

function Home() {
  // 오늘의 특가 상품들
  const todaySpecial = [
    { img: "/images/오늘의특가1.jpg", title: "상품 1", price: "₩199,000" },
    { img: "/images/오늘의특가2.jpg", title: "상품 2", price: "₩199,000" },
    { img: "/images/오늘의특가3.jpg", title: "상품 3", price: "₩199,000" },
    { img: "/images/오늘의특가4.jpg", title: "상품 4", price: "₩199,000" },
    { img: "/images/오늘의특가5.jpg", title: "상품 5", price: "₩199,000" },
    { img: "/images/오늘의특가6.jpg", title: "상품 6", price: "₩199,000" }
  ];

  // 랭킹 상품들
  const ranking = [
    { img: "/images/랭킹1.webp", title: "랭킹 상품 1", price: "₩299,000" },
    { img: "/images/랭킹2.webp", title: "랭킹 상품 2", price: "₩299,000" },
    { img: "/images/랭킹3.webp", title: "랭킹 상품 3", price: "₩299,000" },
    { img: "/images/랭킹4.webp", title: "랭킹 상품 4", price: "₩299,000" },
    { img: "/images/랭킹5.webp", title: "랭킹 상품 5", price: "₩299,000" },
    { img: "/images/랭킹6.webp", title: "랭킹 상품 6", price: "₩299,000" }
  ];

  return (
    <div className="home">
      <section className="special-offer">
        <h2>오늘의 특가</h2>
        <div className="product-list">
          {todaySpecial.map((item, index) => (
            <div className="product-card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ranking">
        <h2>랭킹</h2>
        <div className="product-list">
          {ranking.map((item, index) => (
            <div className="product-card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
