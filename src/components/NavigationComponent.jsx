// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../redux/actions/authActions";

const NavigationComponent = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showDropdown, setShowDropdown] = useState(false);
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   dispatch(login({ email, password }));
  //   setShowDropdown(false);
  // };

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  // const stopPropagation = (e) => {
  //   e.stopPropagation();
  // };

  return (
    <div className="container-fluid">
      <nav>
        <ul className="menu-link">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/ads">Annunci</a>
          </li>
          <li>
            <a href="/about">Chi siamo</a>
          </li>
          <li>
            <a href="/contact">Contatti</a>
          </li>
        </ul>
        {/* <ul className="auth-link">
          <li className="auth-menu" onClick={toggleDropdown}>
            {user ? user.name : "Login"}
            {showDropdown && (
              <div className="dropdown" onClick={stopPropagation}>
                {user ? (
                  <ul>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                ) : (
                  <form onSubmit={handleLogin}>
                    <div>
                      <label>Email:</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                      <label>Password:</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Accedi</button>
                  </form>
                )}
              </div>
            )}
          </li>
        </ul> */}
      </nav>
      <div className="top-line"></div>
    </div>
  );
};
export default NavigationComponent;
