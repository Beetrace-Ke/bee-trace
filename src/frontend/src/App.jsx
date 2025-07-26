import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import ProtectedLayout from "./pages/ProtectedLayout";
import BeeKeeper from "./pages/BeeKeeper/BeeKeeper";
import Investor from "./pages/Investor/Investor";
import WalletLogin from "./pages/WalletLogin";
import RoleSelection from "./pages/RoleSelection";
import TrackHoney from "./pages/TrackHoney";
import Invest from "./pages/Invest";
import Credits from "./pages/Credits";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import ProfileSettings from "./pages/ProfileSettings";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/wallet-login", element: <WalletLogin /> },
      { path: "/role-selection", element: <RoleSelection /> },
      { path: "/invest", element: <Invest /> },
      { path: "/credits", element: <Credits /> },
      { path: "/marketplace", element: <Marketplace /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <BeeKeeper /> },
      { path: "/investor-dashboard", element: <Investor /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile-settings", element: <ProfileSettings /> },
      { path: "/track-honey", element: <TrackHoney /> },
    ],
  },
];
const router = (
  <BrowserRouter>
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  </BrowserRouter>
);
const App = () => {
  return router;
};

export default App;
