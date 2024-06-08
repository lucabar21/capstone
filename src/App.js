import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MapComponent from "./components/MapComponent";
import NavigationComponent from "./components/NavigationComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationComponent />
        <Routes>
          <Route path="/" element={<MapComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
