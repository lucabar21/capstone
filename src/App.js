import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NavigationComponent from "./components/NavigationComponent";
import FooterComponent from "./components/FooterComponent";
import Homepage from "./pages/Homepage";
import Ads from "./pages/Ads";
import AdDetails from "./pages/AdDetails";
import Contact from "./pages/Contact";
import AddAd from "./pages/AddAd";
import Login from "./pages/services/Login";
import Dashboard from "./pages/services/Dashboard";
import Register from "./pages/services/Register";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import ImageShow from "./pages/ImageShow";
import Page404 from "./pages/Page404";
import Mission from "./pages/Mission";
import ForgotPassword from "./pages/services/ForgotPassword";
import AdminDashboard from "./pages/services/AdminDashboard";
import OnTop from "./components/OnTop";
import PaginationAds from "./pages/PaginationAds";
import ResetPassword from "./pages/services/ResetPassword";

function App() {
  const user = useSelector((state) => state.auth.user);

  // Svuoto il LocalStorage ogni 30 minuti.
  const removeAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  setInterval(removeAuthData, 1800000);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <OnTop />
          <NavigationComponent />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            {user && user.role === "admin" ? (
              <Route path="/dashboard" element={<AdminDashboard />}></Route>
            ) : user ? (
              <Route path="/dashboard" element={<Dashboard />}></Route>
            ) : (
              <Route path="/dashboard" element={<Navigate to="/login" replace />} />
            )}
            <Route path="/ads" element={<Ads />}></Route>
            <Route path="/ad/:adId" element={<AdDetails />}></Route>
            <Route path="/image/:ImageId" element={<ImageShow />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/add" element={<AddAd />}></Route>
            <Route path="/mission" element={<Mission />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/password-reset/:token" element={<ResetPassword />} />
            <Route path="/all-ads" element={<PaginationAds />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
