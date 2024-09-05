import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppBarComponent from "./components/AppBarComponent";
import DrawerComponent from "./components/DrawerComponent";
import MainContent from "./components/MainContent";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import ProductDetail from "./pages/ProductDetail";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import { useAuth, AuthProvider } from "./components/AuthContext";

const AppContent = () => {
  const { isAuthenticated, signIn, signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/sign-in" element={<SignInPage onSignIn={signIn} />} />
        <Route path="/sign-out" element={<SignOutPage onSignOut={signOut} />} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent
        drawerOpen={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
      />
      <DrawerComponent
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <MainContent drawerOpen={drawerOpen}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/sign-out"
            element={<SignOutPage onSignOut={signOut} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainContent>
    </Box>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
