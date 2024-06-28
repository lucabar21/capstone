import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAds } from "../redux/actions";
import ImageSliderComponent from "../components/ImageSliderComponent";
import Spinner from "../components/sub_components/Spinner";
import CardSliderComponent from "../components/CardSliderComponent";

const AdDetails = () => {
  // const navigate = useNavigate();
  const { adId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const ads = useSelector((state) => state.ads.data) || [];
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);

  const [adComment, setAdComment] = useState({
    user_id: user && user.id,
    ad_id: adId,
    content: "",
  });

  const handleComment = (e) => {
    setAdComment({ ...adComment, content: e.target.value });
  };

  //Raccolgo la lista degli utenti per poter mostrare l'utente che ha commentato facendo un match con l'user_id dei commenti.
  const usersRequest = () => {
    fetch("http://localhost:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  };

  //Chiamata POST per l'invio e la creazione di un nuovo commento.
  const commentsRequest = () => {
    fetch("http://localhost:8000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adComment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (adComment && adComment.content) {
      commentsRequest();
    } else {
      setError("Il commento è vuoto!");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  useEffect(() => {
    usersRequest();
    dispatch(getAds());
  }, [dispatch, adComment]);

  const ad = ads ? ads.find((singleAd) => singleAd.id === parseInt(adId, 10)) : null;
  // if (!ad) {
  //   navigate("/ads");
  // }
  // Trasformo il formato della data di creazione dell'annuncio.
  const lastDate = ad ? ad.created_at : new Date();
  const date = new Date(lastDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const goBack = () => {
    window.history.back();
  };
  return (
    <main>
      {ad && users && ads ? (
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
              <button className="log-btn" onClick={goBack}>
                Indietro
              </button>
            </div>
          )}
          {ad && (
            <div className="comment-container">
              <p>Commenti</p>
              {ad.comments.length > 0 &&
                users &&
                ad.comments.map((comment) => {
                  const commentUser = users.find((user) => user.id === comment.user_id);
                  const userName = commentUser ? commentUser.name : "Utente sconosciuto";

                  return (
                    <div className="user-comment" key={comment.id}>
                      <div className="user-img">
                        <div className="user-text">
                          <p>{userName}</p>
                          <img src={`${process.env.PUBLIC_URL}/verified_yellow.png`} alt="verified" />
                        </div>
                      </div>
                      <span key={comment.id}>{comment.content}</span>
                    </div>
                  );
                })}
              {user && (
                <>
                  <div className="comment-input">
                    <div className="user-img">
                      <div className="user-text">
                        <p>{user.name}</p>
                        <img src={`${process.env.PUBLIC_URL}/verified_yellow.png`} alt="verified" />
                      </div>
                    </div>

                    <form onSubmit={handleCommentSubmit}>
                      <textarea
                        name="comment"
                        id="comment"
                        placeholder="Commenta..."
                        value={adComment.content}
                        onChange={handleComment}
                        cols={100}
                      ></textarea>
                      <button type="submit" className="log-btn">
                        Invia
                      </button>
                    </form>
                  </div>
                  {error && <div className="error-login">{error}</div>}
                </>
              )}
            </div>
          )}
          <h3 className="ads-h3" style={{ margin: "0" }}>
            Scopri altri annunci
          </h3>
          <CardSliderComponent />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};
export default AdDetails;
