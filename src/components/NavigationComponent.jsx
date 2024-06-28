import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";

const NavigationComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const { user, token } = useSelector((state) => state?.auth);

  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    dispatch(logout());

    //Reinderizzo alla homepage e refresho la pagina per evitare di
    //rimanere in pagine dove sono richiesti oggetti user che possono dare errori.
    navigate("/");
    window.location.reload();
  };

  const handleDropdown = () => {
    if (isOpen === true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  // Funzioni per fare in modo che la navbar sia sempre attiva nel momento in cui sei in modalità tablet o superiore.
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container-fluid">
      <nav>
        <div className="nav-persist">
          <Link to="/">
            <div className="nav-logo" onClick={handleResize}>
              <img src={`${process.env.PUBLIC_URL}/pets_super_heroes_logo_nobg.png`} alt="" />
            </div>{" "}
          </Link>
          <span className="hamburger" onClick={handleDropdown}>
            <GiHamburgerMenu />
          </span>
        </div>
        {isOpen === true && (
          <>
            <ul className="menu-link">
              <li className={currentPath === "/" ? "active" : ""} onClick={handleResize}>
                <Link to="/">Home</Link>
              </li>
              <li className={currentPath === "/ads" ? "active" : ""} onClick={handleResize}>
                <Link to="/ads">Annunci</Link>
              </li>
              <li className={currentPath === "/mission" ? "active" : ""} onClick={handleResize}>
                <Link to="/mission">Mission</Link>
              </li>
              <li className={currentPath === "/contact" ? "active" : ""} onClick={handleResize}>
                <Link to="/contact">Contatti</Link>
              </li>
              <li className={currentPath === "/add" ? "active" : ""} onClick={handleResize}>
                <Link to={user ? "/add" : "/login"}>Inserisci Annuncio</Link>
              </li>
            </ul>

            <ul className="menu-link" style={{ marginLeft: "auto" }}>
              {!user || !token ? (
                <>
                  <div className="guest">
                    <Link to="/login" onClick={handleResize}>
                      <button className="log-btn">Accedi</button>
                    </Link>
                    <Link to="/register" onClick={handleResize}>
                      <button className="log-btn">Registrati</button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="logged">
                    <li className={currentPath === "/dashboard" ? "active" : ""} onClick={handleResize}>
                      <a href="/dashboard">{user?.name}</a>
                    </li>
                    <button className="log-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </ul>
          </>
        )}
      </nav>

      {/* <div className="top-line"></div> */}
    </div>
  );
};
export default NavigationComponent;
