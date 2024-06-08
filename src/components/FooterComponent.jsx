const FooterComponent = () => {
  return (
    <div className="container-fluid">
      <div className="bottom-line"></div>

      <h3 className="social_text">SEGUICI SU</h3>

      <ul className="social">
        <li>
          <img src="fb.png" alt="facebook" />
        </li>
        <li>
          <img src="ig.png" alt="instagram" />
        </li>
        <li>
          <img src="yt.png" alt="youtube" />
        </li>
      </ul>

      <ul className="footer">
        <li>
          <a href="/">Servizio Clienti</a>
        </li>
        <li>
          <a href="/">Privacy Policy</a>
        </li>
      </ul>
      <div className="rights">
        <small>© 2024 Nome App. Tutti i diritti riservati.</small>
      </div>
    </div>
  );
};
export default FooterComponent;
