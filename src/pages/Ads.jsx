import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAds } from "../redux/actions";
import CardSliderComponent from "../components/CardSliderComponent";
import MapComponent from "../components/MapComponent";

const Ads = () => {
  // const ads = useSelector((state) => state.ads.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  return (
    <div className="ads-container">
      {/* <h3>CONTROLLA GLI ANNUNCI</h3> */}
      <CardSliderComponent />
      <MapComponent />
      {/* {ads &&
        ads.map((ad, i) => (
          <div className="ads-row" key={i}>
            {ads[i].images.map((image) => (
              <img src={image.url} alt="descriptive_photo" key={i} />
            ))}
            <div className="ads-text">
              <h1>{ad.title}</h1>
              <p>{ad.description}</p>
            </div>
            <div className="comment-container">
              {ads[i].comments.map((comment) => (
                <small key={comment.id}>
                  {comment.user} - {comment.content}
                </small>
              ))}
            </div>
          </div>
        ))} */}
    </div>
  );
};
export default Ads;
