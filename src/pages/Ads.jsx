import { useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import PaginationAds from "./PaginationAds";

const Ads = () => {
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
      <div className="ads-container">
        <div className="ads-text">
          <h3>Regala una nuova vita ad un animale: Scopri chi ti sta aspettando...</h3>
          <p>
            Esplora i nostri annunci per conoscere gli adorabili animali che sono alla ricerca di una nuova casa. Ogni
            cucciolo, cane o gatto ha una storia unica e un cuore pieno di amore da condividere. Scopri il tuo nuovo
            amico a quattro zampe e offrigli la seconda opportunità che merita. Adottare non solo cambierà la loro vita,
            ma riempirà la tua di gioia e compagnia.
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
        <PaginationAds category={category} />
      </div>
    </main>
  );
};
export default Ads;
