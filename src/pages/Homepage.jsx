import MoreBtn from "../components/sub_components/MoreBtn";
import AdsBtn from "../components/sub_components/AdsBtn";
import MapComponent from "../components/MapComponent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Homepage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="home">
      <div className="second-section">
        <div className="second-img">
          <img src="sad_puppies-01.png" alt="happy dog with man" />
        </div>
        <div className="second-text">
          <h3>Un piccolo gesto, un grande cuore.</h3>
          <p>
            Ogni segnalazione può salvare una vita. Unisciti a noi nella nostra missione per dare una seconda
            possibilità agli animali.
          </p>

          <Link to={user ? "/add" : "/login"}>
            {" "}
            <AdsBtn />
          </Link>
        </div>
      </div>

      <div className="quote">
        <div>
          <h5>
            "La grandezza di una nazione e il suo progresso morale si possono giudicare dal modo in cui tratta gli
            animali."
          </h5>
          <p>[Mahatma Gandhi]</p>
        </div>
      </div>

      <div className="map-section">
        <div className="map-text">
          <h3>Ci sono animali che hanno bisogno di te!</h3>
          <p>
            Ogni animale ha bisogno del suo eroe. Scopri come puoi fare la differenza nella vita di un cane o un gatto.
            Diventa un
            <strong style={{ color: "#7e7eff" }}> Pet's Super Hero!</strong>
          </p>
        </div>
        <MapComponent />
      </div>

      <div className="quote">
        <div>
          <h5>"Fino a quando non hai amato un animale, una parte della tua anima sarà sempre senza luce."</h5>
          <p>[Anatole France]</p>
        </div>
      </div>
      <div className="call-section">
        <div className="hero-text">
          <h3>Insieme per un Futuro Migliore.</h3>
          <p>
            Ogni adozione è una vittoria. Scopri come puoi aiutare e diventare parte del cambiamento che vuoi vedere nel
            mondo.
          </p>
          <a href="/ads">
            <MoreBtn text="Scopri di più" />
          </a>
        </div>
        <div className="hero-img">
          <img src="happy_dog_man-01.png" alt="happy dog with man" />
        </div>
      </div>
    </div>
  );
};
export default Homepage;
