import "./ProductCard.css";

export default function ProductCard() {
  return (
    <div className="product-card">
      <img
        src="https://image.ssfshop.com/upload/product/sample-01.jpg"
        alt="상품"
      />
      <div className="product-info">
        <p className="brand">BEANPOLE</p>
        <h4 className="name">Checked Overshirt</h4>
        <p className="price">₩199,000</p>
      </div>
    </div>
  );
}
