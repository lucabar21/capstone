import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer>
      <div className="bottom-line"></div>

      <h3 className="social_text">SEGUICI E CONDIVIDI SU</h3>

      <ul className="social">
        <li>
          <a href="https://www.facebook.com">
            <img src={`${process.env.PUBLIC_URL}/fb.png`} alt="facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/">
            <img src={`${process.env.PUBLIC_URL}/ig.png`} alt="instagram" />
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/">
            <img src={`${process.env.PUBLIC_URL}/tt.png`} alt="tik tok" />
          </a>
        </li>
        <li>
          <a href="https://www.whatsapp.com/">
            <img src={`${process.env.PUBLIC_URL}/wa.png`} alt="whatsApp" />
          </a>
        </li>
      </ul>

      <ul className="footer">
        <li>
          <Link to={"/contact"}>Inviaci un feedback</Link>
        </li>
      </ul>
      <div className="rights">
        <p>© 2024 Pet's Super Heroes. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};
export default FooterComponent;
