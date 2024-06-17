import { useEffect, useRef } from "react";

import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ImageSliderComponent = ({ images }) => {
  //   Funzioni per abilitare lo scroll orizzontale su un evento onClick.
  console.log(images);
  const slideLeft = () => {
    const slider = document.getElementById("slider-img");
    slider.scrollLeft = slider.scrollLeft - 400;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider-img");
    slider.scrollLeft = slider.scrollLeft + 400;
  };

  //   Funzione per abilitare lo scroll con la mouse wheel sull'elemento.
  const wheelScroll = (e) => {
    const wheel = document.getElementById("slider-img");
    if (e.deltaY > 0) {
      wheel.scrollLeft = wheel.scrollLeft + 600;
    } else if (e.deltaY < 0) {
      wheel.scrollLeft = wheel.scrollLeft - 600;
    }
  };

  const singleImg = () => {
    const slider = document.getElementById("slider-img");
    if (images.length <= 1) {
      slider.style = "justify-content: center";
    }
  };
  //   Funzione per prevenire il comportamento di default dello scroll orizzontale.
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    singleImg();
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
    <div className="img-slider-container">
      <span className="slider-icon_left_img" onClick={slideLeft}>
        <BsFillArrowLeftSquareFill />
      </span>
      <div id="slider-img" onWheel={wheelScroll} ref={ref}>
        {images &&
          images.map((image) => (
            <Link key={image.id} to={"/image/" + image.id}>
              <div className="slider-image">
                <img src={`http://localhost:8000/storage/${image.url}`} alt="descriptive_photo" />
              </div>
            </Link>
          ))}
      </div>
      <span className="slider-icon_right_img" onClick={slideRight}>
        <BsFillArrowRightSquareFill />
      </span>
    </div>
  );
};
export default ImageSliderComponent;
