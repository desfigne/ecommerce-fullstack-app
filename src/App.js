// src/App.js
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AccountRecovery from "./pages/auth/AccountRecovery";
import NaverCallback from "./pages/auth/NaverCallback";
import KakaoCallback from "./pages/auth/KakaoCallback";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";

import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/order/Checkout";
import MyOrders from "./pages/order/MyOrders";
import CartPage from "./pages/cart/CartPage";

import CategoryPage from "./pages/CategoryPage";

import GolfMain from "./pages/golf/GolfMain";
import GolfNew from "./pages/golf/GolfNew";
import GolfWomen from "./pages/golf/GolfWomen";
import GolfMen from "./pages/golf/GolfMen";

import LuxuryMain from "./pages/luxury/LuxuryMain";
import LuxuryNew from "./pages/luxury/LuxuryNew";
import LuxuryWomen from "./pages/luxury/LuxuryWomen";
import LuxuryMen from "./pages/luxury/LuxuryMen";

import ShoesMain from "./pages/shoes/ShoesMain";
import ShoesNew from "./pages/shoes/ShoesNew";
import ShoesWomen from "./pages/shoes/ShoesWomen";
import ShoesMen from "./pages/shoes/ShoesMen";

import LifeMain from "./pages/life/LifeMain";
import LifeNew from "./pages/life/LifeNew";
import LifeFurniture from "./pages/life/LifeFurniture";
import LifePet from "./pages/life/LifePet";
import LifeCar from "./pages/life/LifeCar";

import OutletMain from "./pages/outlet/OutletMain";
import OutletWomen from "./pages/outlet/OutletWomen";
import OutletMen from "./pages/outlet/OutletMen";
import OutletKids from "./pages/outlet/OutletKids";
import OutletLuxury from "./pages/outlet/OutletLuxury";
import OutletShoes from "./pages/outlet/OutletShoes";
import OutletSports from "./pages/outlet/OutletSports";
import OutletGolf from "./pages/outlet/OutletGolf";
import OutletLife from "./pages/outlet/OutletLife";

import MyPage from "./pages/mypage/MyPage";
import HelpPage from "./pages/help/HelpPage";
import CompanyPage from "./pages/company/CompanyPage";
import PolicyPage from "./pages/policy/PolicyPage";

// ✅ 위시리스트 (경로 정리)
import Wishlist from "./pages/wish/Wishlist";

import ProductList from "./pages/ProductList";
import Search from "./pages/Search"; // 검색 페이지

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {/* 홈 & 기본 */}
        <Route exact path="/" component={Home} />
        <Route path="/menu" component={Menu} />

        {/* 인증/계정 */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/account/recovery" component={AccountRecovery} />
        <Route path="/naver-callback" component={NaverCallback} />
        <Route path="/kakao-callback" component={KakaoCallback} />
        <Route path="/mypage" component={MyPage} />

        {/* 고객센터/회사/정책 */}
        <Route path="/help" component={HelpPage} />
        <Route path="/company" component={CompanyPage} />
        <Route path="/policy" component={PolicyPage} />

        {/* ✅ 위시리스트 */}
        <Route path="/wishlist" component={Wishlist} />

        {/* 검색 */}
        <Route path="/search/:keyword" component={Search} />

        {/* 주문/관리자/결제/장바구니/상품 */}
        <Route path="/orders" component={MyOrders} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin" component={AdminDashboard} />
        <Route exact path="/cart" component={CartPage} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/product" component={ProductDetail} />
        <Route path="/checkout" component={Checkout} />

        {/* 여성/남성/키즈/스포츠/뷰티 등 카테고리 */}
        <Route path="/women/:subcategory?" component={CategoryPage} />
        <Route path="/men/:subcategory?" component={CategoryPage} />
        <Route path="/kids/:subcategory?" component={CategoryPage} />
        <Route path="/sports/:subcategory?" component={CategoryPage} />
        <Route path="/beauty/:subcategory?" component={CategoryPage} />

        {/* 골프 */}
        <Route exact path="/golf" component={GolfMain} />
        <Route path="/golf/new" component={GolfNew} />
        <Route path="/golf/women" component={GolfWomen} />
        <Route path="/golf/men" component={GolfMen} />

        {/* 신발 */}
        <Route exact path="/shoes" component={ShoesMain} />
        <Route path="/shoes/new" component={ShoesNew} />
        <Route path="/shoes/women" component={ShoesWomen} />
        <Route path="/shoes/men" component={ShoesMen} />

        {/* 라이프 */}
        <Route exact path="/life" component={LifeMain} />
        <Route path="/life/new" component={LifeNew} />
        <Route path="/life/furniture" component={LifeFurniture} />
        <Route path="/life/pet" component={LifePet} />
        <Route path="/life/car" component={LifeCar} />

        {/* 럭셔리 */}
        <Route exact path="/luxury" component={LuxuryMain} />
        <Route path="/luxury/new" component={LuxuryNew} />
        <Route path="/luxury/women" component={LuxuryWomen} />
        <Route path="/luxury/men" component={LuxuryMen} />

        {/* 아울렛 */}
        <Route exact path="/outlet" component={OutletMain} />
        <Route path="/outlet/women" component={OutletWomen} />
        <Route path="/outlet/men" component={OutletMen} />
        <Route path="/outlet/kids" component={OutletKids} />
        <Route path="/outlet/luxury" component={OutletLuxury} />
        <Route path="/outlet/shoes" component={OutletShoes} />
        <Route path="/outlet/sports" component={OutletSports} />
        <Route path="/outlet/golf" component={OutletGolf} />
        <Route path="/outlet/life" component={OutletLife} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
