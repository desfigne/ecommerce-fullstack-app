import { Link } from "react-router-dom";
import "./Footer.css";


export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-bold mb-3">고객센터</h4>
          <p className="text-neutral-600">평일 09:00–18:00</p>
          <p className="text-neutral-600">1644-XXXX</p>
        </div>
        <div>
          <h4 className="font-bold mb-3">안내</h4>
          <ul className="space-y-2 text-neutral-600">
            <li><Link to="/help">주문/배송</Link></li>
            <li><Link to="/help">취소/환불</Link></li>
            <li><Link to="/help">매장 안내</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">정책</h4>
          <ul className="space-y-2 text-neutral-600">
            <li><Link to="/policy">개인정보처리방침</Link></li>
            <li><Link to="/policy">이용약관</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">회사</h4>
          <ul className="space-y-2 text-neutral-600">
            <li><Link to="/company">브랜드 스토리</Link></li>
            <li><Link to="/company">채용</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        © 2025 1조프로젝트 Shop
      </div>
    </footer>
  );
}
