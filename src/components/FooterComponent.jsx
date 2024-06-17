const FooterComponent = () => {
  return (
    <footer>
      <div className="bottom-line"></div>

      <h3 className="social_text">SEGUI E CONDIVIDI SU</h3>

      <ul className="social">
        <li>
          <img src={`${process.env.PUBLIC_URL}/fb.png`} alt="facebook" />
        </li>
        <li>
          <img src={`${process.env.PUBLIC_URL}/ig.png`} alt="instagram" />
        </li>
        <li>
          <img src={`${process.env.PUBLIC_URL}/yt.png`} alt="youtube" />
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
        <p>© 2024 Pet's Super Heroes. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};
export default FooterComponent;
