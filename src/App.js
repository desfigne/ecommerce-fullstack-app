import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AccountRecovery from "./pages/auth/AccountRecovery";
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

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/account/recovery" component={AccountRecovery} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/company" component={CompanyPage} />
        <Route path="/policy" component={PolicyPage} />

        <Route path="/orders" component={MyOrders} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin" component={AdminDashboard} />
        <Route exact path="/cart" component={CartPage} />

        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/product" component={ProductDetail} />
        <Route path="/checkout" component={Checkout} />

        <Route path="/women/:subcategory?" component={CategoryPage} />
        <Route path="/men/:subcategory?" component={CategoryPage} />
        <Route path="/kids/:subcategory?" component={CategoryPage} />

        <Route exact path="/luxury" component={LuxuryMain} />
        <Route path="/luxury/new" component={LuxuryNew} />
        <Route path="/luxury/women" component={LuxuryWomen} />
        <Route path="/luxury/men" component={LuxuryMen} />

        <Route exact path="/shoes" component={ShoesMain} />
        <Route path="/shoes/new" component={ShoesNew} />
        <Route path="/shoes/women" component={ShoesWomen} />
        <Route path="/shoes/men" component={ShoesMen} />

        <Route path="/sports/:subcategory?" component={CategoryPage} />

        <Route exact path="/golf" component={GolfMain} />
        <Route path="/golf/new" component={GolfNew} />
        <Route path="/golf/women" component={GolfWomen} />
        <Route path="/golf/men" component={GolfMen} />

        <Route path="/beauty/:subcategory?" component={CategoryPage} />

        <Route exact path="/life" component={LifeMain} />
        <Route path="/life/new" component={LifeNew} />
        <Route path="/life/furniture" component={LifeFurniture} />
        <Route path="/life/pet" component={LifePet} />
        <Route path="/life/car" component={LifeCar} />

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
