import MoreBtn from "../components/sub_components/MoreBtn";
import AdsBtn from "../components/sub_components/AdsBtn";
import MapComponent from "../components/MapComponent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const Homepage = () => {
  const user = useSelector((state) => state.auth.user);

  const [category, setCategory] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const handleCategories = (value) => {
    setCategory(value);
    console.log(value);
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
    <main>
      <div className="home">
        <div></div>
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
            <h5>"Fino a quando non hai amato un animale, una parte della tua anima sarà sempre senza luce."</h5>
            <p>[Anatole France]</p>
          </div>
        </div>

        <div className="map-section">
          <div className="map-text">
            <h3>
              Trova il compagno di cui non sai di aver bisogno: Scopri gli animali in cerca di casa più vicini a te...
            </h3>
            <p>
              Utilizza la nostra mappa interattiva per esplorare gli annunci di animali geolocalizzati nella tua zona.
              Ogni pin rappresenta un animale che attende di trovare una famiglia amorevole. Che tu stia cercando un
              cucciolo giocoso o un gatto affettuoso, il tuo futuro amico a quattro zampe potrebbe essere proprio dietro
              l'angolo. Fai la differenza oggi e trova il compagno perfetto per te.
            </p>
          </div>
          <div className="filter-btn-container">
            <div>
              <p>Filtra gli annunci per categoria:</p>{" "}
              <span className="hamburger" onClick={handleDropdown}>
                <GiHamburgerMenu />
              </span>
            </div>
            {isOpen && (
              <div className="btn-filter-drop">
                <button className="log-btn filter-btn" onClick={() => handleCategories(0)}>
                  Tutti
                </button>
                <button className="log-btn filter-btn" onClick={() => handleCategories(1)}>
                  Cani
                </button>
                <button className="log-btn filter-btn" onClick={() => handleCategories(2)}>
                  Gatti
                </button>
                <button className="log-btn filter-btn" onClick={() => handleCategories(3)}>
                  Altri Animali
                </button>
              </div>
            )}
          </div>
          <MapComponent category={category} />
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

        <div className="call-section">
          <div className="hero-text">
            <h3>Insieme per un Futuro Migliore.</h3>
            <p>
              Ogni adozione è una vittoria. Scopri come puoi aiutare e diventare parte del cambiamento che vuoi vedere
              nel mondo.
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
    </main>
  );
};
export default Homepage;
