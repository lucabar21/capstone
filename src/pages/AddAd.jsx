import { useState } from "react";
import { FaDog, FaCat } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import MiniMapComponent from "../components/MiniMapComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdCheckbox } from "react-icons/io";

import { IoIosArrowDropdownCircle } from "react-icons/io";

const AddAd = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [latLng, setLatLng] = useState({ lat: "", lng: "" });
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    user_id: user ? user.id : "",
  });

  // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

  // Gestione del cambio dell'input file
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Ottieni un array di file selezionati
    setImages(selectedFiles); // Aggiorna lo stato delle immagini con i file selezionati
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un nuovo annuncio
    const adData = {
      title: formData.title,
      description: formData.description,
      latitude: latLng.lat,
      longitude: latLng.lng,
      user_id: formData.user_id,
      categories: [formData.category],
    };

    try {
      const adResponse = await fetch("http://localhost:8000/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adData),
      });

      if (adResponse.ok) {
        const ad = await adResponse.json();
        console.log("Annuncio creato con successo", ad);
        console.log(ad);

        if (images.length > 0) {
          if (!ad.id) {
            throw new Error("ID dell'annuncio non ricevuto correttamente");
          }
        }
        // Carica le immagini

        const imageData = new FormData();
        images.forEach((image, index) => {
          imageData.append(`images[]`, image);
        });
        imageData.append("ad_id", ad.id);

        const imageResponse = await fetch("http://localhost:8000/api/images", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageData,
        });

        if (imageResponse.ok) {
          console.log("Immagini caricate con successo");
        } else {
          console.log("Errore nel caricamento delle immagini");
          setError("Errore! Qualcosa è andato storto nel caricamento delle immagini, riprova.");
          setTimeout(() => {
            setError(null);
          }, 3000);
        }

        // Reset dei campi del form
        setFormData({
          category: "",
          title: "",
          description: "",
          user_id: user.id,
        });
        setImages([]);
        setLatLng({ lat: "", lng: "" });
        navigate("/ads");
      } else {
        console.log("Errore nella creazione dell'annuncio");
        setError("Errore! Qualcosa è andato storto, riprova.");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
    }
  };

  const handleDropdown = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <main>
      <div className="rules">
        <h1>
          Accetta un consiglio.
          <IoIosArrowDropdownCircle onClick={handleDropdown} />
        </h1>
        {show && (
          <div className="rules-drop">
            <h4>
              Il nostro sito ti permette di creare annunci per animali ritrovati in modo semplice e veloce. Segui questi
              passaggi per pubblicare il tuo annuncio:
            </h4>
            <div>
              <h6>Punto 1</h6>
              <p> Seleziona la categoria dell'annuncio che meglio descrive l'animale ritrovato.</p>
            </div>
            <div>
              <h6>Punto 2</h6>
              <p> Scrivi un titolo breve ma esplicativo che aiuti a identificare l'animale rapidamente.</p>
            </div>
            <div>
              <h6>Punto 3</h6>
              <p>
                Fornisci una descrizione dettagliata dell'animale, le circostanze del ritrovamento e aggiungi delle
                informazioni di contatto.
              </p>
            </div>
            <div>
              {" "}
              <h6>Punto 4</h6>
              <p>
                Carica delle immagini che possano descrivere al meglio la situazione del ritrovamento e la tipologia di
                animale in questione. Le immagini sono spesso la parte più attrattiva di un annuncio, sfruttiamola a
                favore dei nostri amici che di bellezza ne hanno da vendere!
              </p>
            </div>
            <div>
              <h6>Punto 5</h6>
              <p>
                {" "}
                Alla fine, seleziona un punto sulla mappa per geolocalizzare il tuo annuncio. Questo aiuterà i
                proprietari a capire dove è stato ritrovato l'animale.
              </p>
            </div>

            <h5>
              Ti preghiamo di rispettare queste poche e semplici linee guida per permettere all'annuncio di avere il
              giusto seguito ed aiutare l'animale in difficoltà.
            </h5>
          </div>
        )}
      </div>
      <div className="adAdd-container">
        <h3>Inserisci un annuncio!</h3>
        <form onSubmit={handleSubmit}>
          <div className="custom-input">
            <fieldset>
              <div>
                <input
                  type="radio"
                  id="category"
                  name="categories"
                  value="1"
                  checked={formData.category === "1"}
                  onChange={handleInputChange}
                />
                <label htmlFor="category_1">Cani</label>
                <FaDog />
              </div>

              <div>
                <input
                  type="radio"
                  id="category"
                  name="categories"
                  value="2"
                  checked={formData.category === "2"}
                  onChange={handleInputChange}
                />
                <label htmlFor="category">Gatti</label>
                <FaCat />
              </div>

              <div>
                <input
                  type="radio"
                  id="category"
                  name="categories"
                  value="3"
                  checked={formData.category === "3"}
                  onChange={handleInputChange}
                />
                <label htmlFor="category">Altri</label>
                <FaHandHoldingHeart />
              </div>
            </fieldset>
          </div>
          <div className="custom-input-title">
            <label htmlFor="title">Titolo</label>
            <input type="text" id="title" value={formData.title} onChange={handleInputChange} required />
          </div>

          <div className="custom-textarea">
            <textarea
              id="description"
              cols="200"
              rows="12"
              placeholder="Descrizione annuncio..."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="custom-input">
            <label htmlFor="images" className="custom-file-upload">
              Seleziona immagini
            </label>
            <input type="file" id="images" onChange={handleFileChange} multiple />
            {images.length > 0 && (
              <span className="file-check">
                {images.length} <IoMdCheckbox />
              </span>
            )}
          </div>
          {modal && <div className="error-login">{modal}</div>}
          <MiniMapComponent setLatLng={setLatLng} />
          <input type="hidden" id="latitude" value={latLng.lat} readOnly required />
          <input type="hidden" id="longitude" value={latLng.lng} readOnly required />
          {error && <div className="error-login">{error}</div>}
          <button type="submit">Pubblica</button>
        </form>
      </div>
    </main>
  );
};

export default AddAd;
