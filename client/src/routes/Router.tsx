import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../components/Layouts/Default";

import { PageLogin } from "../pages/Login";

import { Page404 } from "../pages/Page404.tsx";
import { PageRegister } from "../pages/Register/Register.tsx";
import { DashLayout } from "../components/Layouts/Dash/";
import { PrivateRoute } from "./PrivateRoute.tsx";
import { PageDashUserList, PageDashUserForm, PageDashUserEdit } from "../pages/Dash/User/";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<PageLogin />} />
        <Route path="login" element={<PageLogin />} />
        <Route path="register" element={<PageRegister />} />
        <Route path="/user" element={<DashLayout />}>
          <Route
            path=""
            element={<PrivateRoute Component={PageDashUserList} />}
          />
          <Route
            path="add"
            element={<PrivateRoute Component={PageDashUserForm} />}
          />
          <Route
            path=":id"
            element={<PrivateRoute Component={PageDashUserEdit} />}
          />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
