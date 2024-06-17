import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../redux/actions";
import { Link } from "react-router-dom";
import MoreBtn from "../components/sub_components/MoreBtn";

import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";

const CardSliderComponent = () => {
  const ads = useSelector((state) => state.ads.data);
  const dispatch = useDispatch();
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  useEffect(() => {
    if (ads && ads.length > 0) {
      const adsSlides = ads.map((ad) => {
        return {
          id: ad.id,
          image: ad.images.url || "https://placedog.net/500",
          title: ad.title,
          description: ad.description,
        };
      });
      setSlides(adsSlides);
    }
  }, [ads]);
  //   Funzioni per abilitare lo scroll orizzontale su un evento onClick.
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = 0;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
  };

  //   Funzione per abilitare lo scroll con la mouse wheel sull'elemento.
  const wheelScroll = (e) => {
    const wheel = document.getElementById("slider");
    if (e.deltaY > 0) {
      wheel.scrollLeft = wheel.scrollLeft + 600;
    } else if (e.deltaY < 0) {
      wheel.scrollLeft = wheel.scrollLeft - 600;
    }
  };

  //   Funzione per prevenire il comportamento di default dello scroll orizzontale.
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
      }
    };

    if (element) {
      element.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div id="main-slider-container">
      <span className="slider-icon_left" onClick={slideLeft}>
        <BsFillArrowLeftSquareFill />
      </span>
      <div id="slider" onWheel={wheelScroll} ref={ref}>
        {slides &&
          slides.map((slide) => (
            <div className="slider-card" key={slide.id}>
              <span className="badge">{slide.id}</span>
              <img
                className="slider-card-image"
                src={slide.image.url || "https://placedog.net/500"}
                alt="descriptive_photo"
              />
              <div className="title-slider">
                <h1 className="slider-card-title">{slide.title}</h1>
                <h1 className="slider-card-description">
                  {slide.description.length < 150 ? slide.description : slide.description.slice(0, 150) + "..."}
                </h1>
              </div>
              <div className="btn-container">
                <Link to={`/ad/` + slide.id}>
                  <MoreBtn text="Visualizza" />
                </Link>
              </div>
            </div>
          ))}
      </div>
      <span className="slider-icon_right" onClick={slideRight}>
        <BsFillArrowRightSquareFill />
      </span>
    </div>
  );
};
export default CardSliderComponent;
