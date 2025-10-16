import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [activeRankingTab, setActiveRankingTab] = useState(0);

  const slides = [
    {
      title: "WINTER COLLECTION\n따뜻하고 스타일리시한\n겨울 아우터",
      subtitle: "2025 F/W 신상품",
      desc: "최대 60% 할인 + 무료배송",
      image: "https://img.ssfshop.com/display/category/DSP/2025/01/main_banner_winter.jpg"
    },
    {
      title: "프리미엄 캐시미어\n부드러운 터치감",
      subtitle: "EXCLUSIVE COLLECTION",
      desc: "한정 수량 특별가",
      image: "https://img.ssfshop.com/display/category/DSP/2025/01/main_banner_cashmere.jpg"
    },
    {
      title: "NEW ARRIVALS\n2025 봄 컬렉션 사전예약",
      subtitle: "SPRING PREVIEW",
      desc: "얼리버드 20% 할인",
      image: "https://img.ssfshop.com/display/category/DSP/2025/01/main_banner_spring.jpg"
    }
  ];

  const productCategories = [
    "니트 카디건",
    "백 & 슈즈",
    "쥬얼리 & 액세서리",
    "뷰티 & 향수",
    "코스메틱",
    "키즈 & 베이비"
  ];

  const rankingCategories = [
    "여성", "남성", "키즈", "럭셔리", "백&슈즈", "스포츠", "골프", "뷰티", "라이프"
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Slider */}
        <section className="hero-slider">
          <div className="slider-container">
            <div className="slider-wrapper">
              {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                  <div className="slide-content">
                    <h2 className="slide-title">{slide.title}</h2>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <p className="slide-desc">{slide.desc}</p>
                  </div>
                  <img src={slide.image} alt={slide.title} />
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button className="prev-btn" aria-label="이전" onClick={prevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="next-btn" aria-label="다음" onClick={nextSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="slider-dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Logos Section */}
        <section className="brand-logos">
          <div className="container">
            <div className="brand-slider">
              <div className="brand-track">
                {[...Array(2)].map((_, dupIndex) => (
                  <React.Fragment key={dupIndex}>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/category/DSP/2022/11/08/2211081550322820_20221108155303.jpg" alt="8seconds" />
                      <span>에잇세컨즈</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/category/DSP/2022/11/08/2211081550425060_20221108155324.jpg" alt="BEANPOLE" />
                      <span>빈폴</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/html/SSF/2019/0614_beaker/img/logo.png" alt="BEAKER" />
                      <span>비이커</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/category/DSP/2022/11/08/2211081550522490_20221108155326.jpg" alt="KUHO" />
                      <span>구호</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/html/DSP/2020/brand/isseymiyake/img/logo.png" alt="ISSEY MIYAKE" />
                      <span>이세이미야케</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/category/DSP/2021/08/31/2108311455197420_20210831145659.png" alt="Theory" />
                      <span>띠어리</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/html/DSP/2020/brand/cdg/img/logo.png" alt="COMME des GARCONS" />
                      <span>꼼데가르송</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/html/DSP/2019/brand/patagonia/img/logo.png" alt="patagonia" />
                      <span>파타고니아</span>
                    </div>
                    <div className="brand-item">
                      <img src="https://img.ssfshop.com/display/html/DSP/2019/brand/cos/img/logo.png" alt="COS" />
                      <span>코스</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Event Banner Section */}
        <section className="event-banner">
          <div className="container">
            <h2 className="section-title">이벤트</h2>
            <div className="event-grid">
              <div className="event-card">
                <img src="https://ext.same-assets.com/947818454/216419883.jpeg" alt="첫 구매 한정 -50% 특가" />
                <div className="event-content">
                  <h3>첫 구매 한정 -50% 특가</h3>
                  <p>10주년 기념 최대 혜택 받아가세요</p>
                </div>
              </div>
              <div className="event-card">
                <img src="https://ext.same-assets.com/947818454/521681749.jpeg" alt="10주년 한정 첫 구매 지원금" />
                <div className="event-content">
                  <h3>10주년 한정 첫 구매 지원금</h3>
                  <p>매월 100명에게 선물로 1만 포인트 드립니다</p>
                </div>
              </div>
              <div className="event-card">
                <img src="https://ext.same-assets.com/947818454/1642450336.jpeg" alt="앱에서 첫 로그인하고 쿠폰 받기" />
                <div className="event-content">
                  <h3>앱에서 첫 로그인하고 쿠폰 받기</h3>
                  <p>1만원 쿠폰 즉시 지급</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="product-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">고마움과 안부, 마음껏 전할 시간</h2>
              <div className="category-tabs">
                {productCategories.map((category, index) => (
                  <button
                    key={index}
                    className={`tab-btn ${index === activeProductTab ? 'active' : ''}`}
                    onClick={() => setActiveProductTab(index)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-grid">
              <div className="product-card">
                <div className="product-image">
                  <img src="https://ext.same-assets.com/947818454/3207359177.jpeg" alt="anggae Smocked Knit Cardigan" />
                  <button className="wishlist-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
                <div className="product-info">
                  <span className="brand">anggae</span>
                  <h3 className="product-name">Smocked Knit Cardigan - Grey</h3>
                  <div className="price">
                    <span className="current-price">159,000</span>
                  </div>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="https://ext.same-assets.com/947818454/1010207927.jpeg" alt="8 seconds" />
                  <button className="wishlist-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                  <span className="discount-badge">10%</span>
                </div>
                <div className="product-info">
                  <span className="brand">8 seconds</span>
                  <h3 className="product-name">울100 카디건 - 카키</h3>
                  <div className="price">
                    <span className="original-price">69,900</span>
                    <span className="current-price">59,900</span>
                  </div>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="https://ext.same-assets.com/947818454/3793950654.jpeg" alt="Maia" />
                  <button className="wishlist-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
                <div className="product-info">
                  <span className="brand">Maia</span>
                  <h3 className="product-name">Two-Way Cardigan - French Roast</h3>
                  <div className="price">
                    <span className="current-price">품절</span>
                  </div>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="https://ext.same-assets.com/947818454/3826030000.jpeg" alt="320Showroom" />
                  <button className="wishlist-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                  <span className="discount-badge">10%</span>
                </div>
                <div className="product-info">
                  <span className="brand">320Showroom</span>
                  <h3 className="product-name">V-Neck Button-Up Wool Alpaca Knit Cardigan</h3>
                  <div className="price">
                    <span className="original-price">79,000</span>
                    <span className="current-price">64,800</span>
                  </div>
                </div>
              </div>

              <div className="product-card">
                <div className="product-image">
                  <img src="https://ext.same-assets.com/947818454/635366670.jpeg" alt="HANE" />
                  <button className="wishlist-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                  <span className="discount-badge">26%</span>
                </div>
                <div className="product-info">
                  <span className="brand">HANE</span>
                  <h3 className="product-name">플라테카드 자켓 울 니트 가디건_Charcoal</h3>
                  <div className="price">
                    <span className="original-price">156,000</span>
                    <span className="current-price">118,800</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ranking Section */}
        <section className="ranking-section">
          <div className="container">
            <h2 className="section-title">랭킹</h2>
            <div className="ranking-tabs">
              {rankingCategories.map((category, index) => (
                <button
                  key={index}
                  className={`tab-btn ${index === activeRankingTab ? 'active' : ''}`}
                  onClick={() => setActiveRankingTab(index)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="ranking-grid">
              <div className="ranking-item">
                <span className="rank">1</span>
                <img src="https://ext.same-assets.com/947818454/3206396286.jpeg" alt="SAMSONITE" />
                <div className="item-info">
                  <h4>SAMSONITE</h4>
                  <p>[캠소나이트] OCLITE 캐리어 55/68(2024년형) 2종세트 4종택1</p>
                  <div className="price">
                    <span className="discount">59%</span>
                    <strong>197,100</strong>
                  </div>
                </div>
              </div>

              <div className="ranking-item">
                <span className="rank">2</span>
                <img src="https://ext.same-assets.com/947818454/357450008.jpeg" alt="FITFLOP" />
                <div className="item-info">
                  <h4>FITFLOP</h4>
                  <p>[핏플랍] 여성 벨트 메리제인 탈레미나 블랙루소스 - 톰 플랙</p>
                  <div className="price">
                    <span className="discount">5%</span>
                    <strong>246,050</strong>
                  </div>
                </div>
              </div>

              <div className="ranking-item">
                <span className="rank">3</span>
                <img src="https://ext.same-assets.com/947818454/1491953271.jpeg" alt="KUHO" />
                <div className="item-info">
                  <h4>KUHO</h4>
                  <p>[BINA] Nylon Buckle Point Shoulder Bag - Black</p>
                  <div className="price">
                    <span className="discount">20%</span>
                    <strong>238,400</strong>
                  </div>
                </div>
              </div>

              <div className="ranking-item">
                <span className="rank">4</span>
                <img src="https://ext.same-assets.com/947818454/573690851.jpeg" alt="LEMAIRE" />
                <div className="item-info">
                  <h4>LEMAIRE</h4>
                  <p>[UNISEX] Croissant Coin Purse - Dark Chocolate</p>
                  <div className="price">
                    <strong>1,980,000</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brands Section */}
        <section className="featured-brands">
          <div className="container">
            <h2 className="section-title">주목할 브랜드</h2>
            <div className="featured-grid">
              <div className="featured-card">
                <img src="https://ext.same-assets.com/947818454/1119019333.jpeg" alt="anggae" />
                <div className="featured-content">
                  <h3>anggae</h3>
                  <p>25F/W 3rd Drop</p>
                  <p className="subtitle">일상에 스며들 가을의 설레임</p>
                  <Link to="/brand/anggae" className="featured-link">기획전 바로가기 →</Link>
                </div>
              </div>

              <div className="featured-card">
                <img src="https://ext.same-assets.com/947818454/578281922.jpeg" alt="anggae" />
                <div className="featured-products">
                  <div className="mini-product">
                    <img src="https://ext.same-assets.com/947818454/1202455836.jpeg" alt="anggae Ribbed Snake Cardigan" />
                    <span className="brand">anggae</span>
                    <span className="name">Ribbed Snake Cardigan - Black</span>
                    <strong>189,000</strong>
                  </div>
                  <div className="mini-product">
                    <img src="https://ext.same-assets.com/947818454/3859394708.jpeg" alt="anggae Off Shoulder Pullover" />
                    <span className="brand">anggae</span>
                    <span className="name">Off Shoulder Pullover - Black</span>
                    <strong>159,000</strong>
                  </div>
                </div>
              </div>

              <div className="featured-card">
                <img src="https://ext.same-assets.com/947818454/3086143679.jpeg" alt="VOLVIK" />
                <div className="featured-content">
                  <h3>VOLVIK</h3>
                  <p>혜택이 불어오는</p>
                  <p className="subtitle">필드를 즐길 시간</p>
                  <Link to="/brand/volvik" className="featured-link">기획전 바로가기 →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="brand-story">
          <div className="container">
            <h2 className="section-title">이 주의 브랜드 이슈</h2>
            <div className="story-grid">
              <div className="story-card">
                <img src="https://ext.same-assets.com/947818454/133835897.jpeg" alt="타이 스타일링의 정석" />
                <h3>타이 스타일링의 정석</h3>
                <p>SUITSUPPLY</p>
              </div>
              <div className="story-card">
                <img src="https://ext.same-assets.com/947818454/3635466172.jpeg" alt="빛나는 도화적 무드" />
                <h3>빛나는 도화적 무드</h3>
                <p>길이를 담은 25F/W</p>
                <p>COMOLI</p>
              </div>
              <div className="story-card">
                <img src="https://ext.same-assets.com/947818454/1176900044.jpeg" alt="가을을 담침 시간" />
                <h3>가을을 담침 시간</h3>
                <p>지금 추천해이볍 2S FALL 신상품</p>
                <p>ANOTHER#</p>
              </div>
              <div className="story-card">
                <img src="https://ext.same-assets.com/947818454/3362617750.jpeg" alt="아식스 x 세실리에 반센" />
                <h3>아식스 x 세실리에 반센</h3>
                <p>볼 캐치타 톡톡</p>
                <p>ASICS KIDS</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-links">
              <Link to="/company">회사소개</Link>
              <Link to="/terms">이용약관</Link>
              <Link to="/privacy">개인정보 처리방침</Link>
              <Link to="/email-policy">이메일무단수집거부</Link>
              <Link to="/video-policy">영상정보처리기기운영방침</Link>
              <Link to="/help">고객센터</Link>
              <Link to="/partnership">제휴/광고</Link>
              <Link to="/notice">공지사항</Link>
              <Link to="/vendor">입점문의</Link>
              <Link to="/bulk-order">단체주문</Link>
            </div>
          </div>

          <div className="footer-content">
            <div className="company-info">
              <h3>삼성물산(주)패션부문</h3>
              <p>주소: 서울특별시 강남구 남부순환로 2806(도곡동)</p>
              <p>대표: 오세철 외 2명</p>
              <p>사업자 등록번호: 101-86-43805</p>
              <p>통신판매업 신고번호: 2015-서울강남-02866</p>
              <p>KG이니시스 구매안전(에스크로)서비스: 서비스 가입사실 확인</p>
              <p>고객상담실: 평일 10시-17시 (점심시간 12시-13시, 주말 및 공휴일 휴무)</p>
              <p>대표전화: 1599-0007(전국) 080-700-1472(수신자부담)</p>
              <p>이메일: <a href="mailto:webmaster@ssfshop.com">webmaster@ssfshop.com</a></p>
            </div>

            <div className="footer-bottom">
              <p>Copyright (C) 2025 Samsung C&T Corporation. All rights reserved</p>
              <img src="https://ext.same-assets.com/947818454/209907754.png" alt="인증마크" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
