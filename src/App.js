import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { Provider } from "react-redux";
import store from "./redux/store";
import ImageShow from "./pages/ImageShow";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavigationComponent />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/ads" element={<Ads />}></Route>
            <Route path="/ad/:adId" element={<AdDetails />}></Route>
            <Route path="/image/:ImageId" element={<ImageShow />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/add" element={<AddAd />}></Route>
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
