import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getIamges } from "../redux/actions";
import Spinner from "../components/sub_components/Spinner";

const ImageShow = () => {
  const navigate = useNavigate();
  const images = useSelector((state) => state.media.file);
  const dispatch = useDispatch();
  const { ImageId } = useParams();

  useEffect(() => {
    dispatch(getIamges());
  }, [dispatch]);

  const image = images ? images.find((singleImage) => singleImage.id === parseInt(ImageId, 10)) : null;
  if (!image) {
    navigate("/ads");
  }
  const goBack = () => {
    window.history.back();
  };

  return (
    <main>
      {image ? (
        <div className="image-show">
          {image && <img src={`http://localhost:8000/storage/${image.url}`} alt="Immagine descrittiva pet" />}
          <button className="log-btn" onClick={goBack}>
            Indietro
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};
export default ImageShow;
