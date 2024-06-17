import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";

const NavigationComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());

    //Reinderizzo alla homepage e refresho la pagina per evitare di
    //rimanere in pagine dove sono richiesti oggetti user che possono dare errori.
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <nav>
        <ul className="menu-link">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ads">Annunci</Link>
          </li>
          <li>
            <Link to="/mission">Mission</Link>
          </li>
          <li>
            <Link to="/contact">Contatti</Link>
          </li>
          <li>
            <Link to={user ? "/add" : "/login"}>Inserisci Annuncio</Link>
          </li>
        </ul>

        <ul className="menu-link" style={{ marginLeft: "auto" }}>
          {!user ? (
            <>
              <Link to="/login">
                <button className="log-btn">Accedi</button>
              </Link>
              <Link to="/register">
                <button className="log-btn">Registrati</button>
              </Link>
            </>
          ) : (
            <>
              <li>
                <a href="/dashboard">{user?.name}</a>
              </li>
              <button className="log-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
      <div className="top-line"></div>
    </div>
  );
};
export default NavigationComponent;
