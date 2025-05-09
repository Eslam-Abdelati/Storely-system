import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import CreateProduct from "./pages/products/CreateProduct/CreateProduct.jsx";
import Main from "./components/main/Main.jsx";
import DetailsUser from "./pages/user/DetailsUser/DetailsUser.jsx";
import AddUser from "./pages/user/AddUser/AddUser.jsx";
import SalaryItems from "./pages/user/SalaryItems/SalaryItrems.jsx";
import IncentivesaAndDiscounts from "./pages/user/IncentivesAndDiscounts/IncentivesaAndDiscounts.jsx";
import PaySallery from "./pages/user/PaySallery/PaySallery.jsx";
import CategoryList from "./pages/categories/categoryList/CategoryList.jsx";
import ListUsers from "./pages/user/ListUsers/ListUsers.jsx";
import Products from "./pages/products/listProducts/Products.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route index element={<Main />} />
            <Route path="users">
              <Route index element={<ListUsers />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="pay-sallery" element={<PaySallery />} />
              <Route path="Payroll-items" element={<SalaryItems />} />
              <Route
                path="pay-money-out"
                element={<IncentivesaAndDiscounts />}
              />
              <Route path="user/:id" element={<DetailsUser />} />
            </Route>
            <Route path="products">
              <Route index element={<Products />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="category" element={<CategoryList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
