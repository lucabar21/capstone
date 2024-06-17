import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ImageShow = () => {
  const [images, setImages] = useState(null);
  const { ImageId } = useParams();

  const ImageRequest = () => {
    fetch("http://localhost:8000/api/images")
      .then((response) => response.json())
      .then((ImageData) => {
        setImages(ImageData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    ImageRequest();
  }, [ImageId]);

  const image = images ? images.find((singleImage) => singleImage.id === parseInt(ImageId, 10)) : null;

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="image-show">
      {image && <img src={`http://localhost:8000/storage/${image.url}`} alt="Immagine descrittiva pet" />}
      <button className="log-btn" onClick={goBack}>
        Indietro
      </button>
    </div>
  );
};
export default ImageShow;
