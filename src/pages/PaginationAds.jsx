import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../redux/actions";
import Spinner from "../components/sub_components/Spinner";
import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";

const PaginationAds = ({ category }) => {
  const ads = useSelector((state) => state.ads.data);
  const dispatch = useDispatch();

  const [slides, setSlides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (ads && ads.length > 0) {
      const filteredAds = category !== 0 ? ads.filter((ad) => ad.categories.some((cat) => cat.id === category)) : ads;
      const adsSlides = filteredAds.map((ad) => {
        return {
          id: ad.id,
          images: ad.images[0],
          title: ad.title,
          description: ad.description,
        };
      });
      setSlides(adsSlides);
    }
  }, [ads, category]);

  // Logica di paginazione

  // Calcola il numero totale di pagine
  const totalPages = Math.ceil(slides && slides.length / itemsPerPage);

  // Calcola gli annunci da mostrare sulla pagina corrente
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAds = slides && slides.slice(indexOfFirstItem, indexOfLastItem);

  // Calcola il numero di placeholder necessari
  const placeholdersCount = Math.max(itemsPerPage - currentAds.length, 0);

  // Genera i numeri delle pagine
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Funzione per passare alla pagina specifica
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Funzione per passare alla pagina successiva
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Funzione per passare alla pagina precedente
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const adGridClasses = ["div1", "div2", "div3", "div4", "div5", "div6", "div7", "div8", "div9"];

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);
  return (
    <>
      {slides.length > 0 ? (
        <>
          <div className="pagination-container">
            {currentAds.map((ad, i) => (
              <div className={`ad-card ${adGridClasses[i % itemsPerPage]}`} key={ad.id}>
                <img
                  src={`http://localhost:8000/storage/${ad.images.url}` || "https://placedog.net/500"}
                  alt="descriptive_photo"
                />
                <div>
                  <p>{ad.title}</p>
                  <Link to={`/ad/` + ad.id}>
                    <button className="log-btn">Vai</button>
                  </Link>
                </div>
              </div>
            ))}
            {Array.from({ length: placeholdersCount }).map((_, i) => (
              <Placeholder key={i} />
            ))}
          </div>
          <div className="pagination">
            <button className="log-btn" onClick={prevPage} disabled={currentPage === 1}>
              Precedente
            </button>
            {pageNumbers.map((number) => (
              <span
                key={number}
                onClick={() => goToPage(number)}
                className={currentPage === number ? "pagination-num active" : "pagination-num"}
              >
                {number}
              </span>
            ))}
            <button className="log-btn" onClick={nextPage} disabled={currentPage === totalPages}>
              Successivo
            </button>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default PaginationAds;
