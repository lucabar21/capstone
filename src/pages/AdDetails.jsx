import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAds } from "../redux/actions";
import ImageSliderComponent from "../components/ImageSliderComponent";

const AdDetails = () => {
  const { adId } = useParams();
  const ads = useSelector((state) => state.ads.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  const ad = ads ? ads.find((singleAd) => singleAd.id === parseInt(adId, 10)) : null;

  // Trasformo il formato della data di creazione dell'annuncio.
  const lastDate = ad ? ad.created_at : new Date();

  const date = new Date(lastDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="ad-detail-container">
      {ad && (
        <div className="latest-ad">
          <ImageSliderComponent images={ad.images} />
          <div className="latest-text">
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <span>
              Data dell'annuncio: <br />
              {formattedDate}
            </span>
          </div>
        </div>
      )}
      {ad && ad.comments.length > 0 && (
        <div className="comment-container">
          <p>Commenti</p>
          {ad.comments.length > 0 &&
            ad.comments.map((comment) => (
              <div className="user-comment">
                <div className="user-img">
                  <img src={`${process.env.PUBLIC_URL}/user_icon_default.png`} alt="user" />
                  <div className="user-text">
                    <p>Name</p>
                    <img src={`${process.env.PUBLIC_URL}/verified_violet.png`} alt="verified" />
                  </div>
                </div>
                <span key={comment.id}>{comment.content}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default AdDetails;
