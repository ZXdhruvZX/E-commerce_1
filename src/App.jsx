import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Order from "./pages/Order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Login from "./pages/registration.jsx/Login";
import Signup from "./pages/registration.jsx/Signup";
import AllProducts from "./pages/allProducts/AllProducts";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/dashboard/pages/Addproduct";
import UpdateProduct from "./pages/admin/dashboard/pages/UpdateProduct";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/order" element={<Order />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </MyState>
  );
}

export default App;
