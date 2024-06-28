import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/sub_components/Spinner";
import { BsFillTrash3Fill } from "react-icons/bs";
import ConfirmationModal from "../../components/sub_components/ConfirmationModal";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const ads = useSelector((state) => state.ads.data);
  const [comments, setComments] = useState(null);
  const dispatch = useDispatch();

  // Stato per modale Annunci
  const [showAdConfirm, setShowAdConfirm] = useState(false);

  // Stato per modale Commenti
  const [showCommentConfirm, setShowCommentConfirm] = useState(false);

  // Stato per modale Account
  const [showAccountConfirm, setShowAccountConfirm] = useState(false);

  const [users, setUsers] = useState(null);

  const usersRequest = () => {
    fetch("http://localhost:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  };

  const currentAccount = users ? users.filter((account) => account.id === user.id) : null;

  // Chiamata per eliminazione Account
  const deleteAccountRequest = (account_id) => {
    fetch(`http://localhost:8000/api/users/${account_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta!");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Account eliminato con successo", data);
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((error) => console.log(error));
  };

  const commentsRequest = () => {
    fetch("http://localhost:8000/api/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.log(error));
  };

  // Chiamata per eliminazione Commenti
  const deleteCommentsRequest = (comment_id) => {
    fetch(`http://localhost:8000/api/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta!");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Commento eliminato con successo", data);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  // Chiamate per eliminazione Annunci
  const deleteAdsRequest = (ad_id) => {
    fetch(`http://localhost:8000/api/ads/${ad_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta!");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Annuncio eliminato con successo", data);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  // Gestione metodi per stati modale cancellazione Account.
  const handleDeleteAccountClick = () => {
    setShowAccountConfirm(true);
  };
  const handleAccountCancel = () => {
    setShowAccountConfirm(false);
  };
  const handleAccountConfirm = (account_id) => {
    setShowAccountConfirm(false);
    deleteAccountRequest(account_id);
  };

  // Gestione metodi per stati modale cancellazione Annunci.
  const handleDeleteAdClick = () => {
    setShowAdConfirm(true);
  };
  const handleAdCancel = () => {
    setShowAdConfirm(false);
  };
  const handleAdConfirm = (ad_id) => {
    setShowAdConfirm(false);
    deleteAdsRequest(ad_id);
  };

  // Gestione metodi per stati modale cancellazione Commenti.
  const handleDeleteCommentClick = () => {
    setShowCommentConfirm(true);
  };
  const handleCommentConfirm = (comment_id) => {
    setShowCommentConfirm(false);
    deleteCommentsRequest(comment_id);
  };
  const handleCommentCancel = () => {
    setShowCommentConfirm(false);
  };

  useEffect(() => {
    commentsRequest();
    usersRequest();
  }, []);

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  const userAds = ads ? ads.filter((ad) => ad.user_id === user.id) : null;
  const userComments = comments ? comments.filter((comment) => comment.user_id === user.id) : null;

  console.log(currentAccount);

  return (
    <main>
      {user && userAds ? (
        <>
          <div className="user-main-dash">
            <div className="dashboard-container">
              <h3>Pet's Super Hero Dashboard</h3>
              <div className="profile-details">
                <div>
                  <div className="dash-badge">
                    <img src={`${process.env.PUBLIC_URL}/pets_super_hero_badge.png`} alt="badge" />
                  </div>
                  <p>
                    {" "}
                    <strong>Nome: </strong> {user.name}
                  </p>{" "}
                  <p>
                    {" "}
                    <strong>Cognome:</strong> {user.surname}
                  </p>{" "}
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
                <span onClick={handleDeleteAccountClick}>Elimina Account</span>
              </div>
              {showAccountConfirm && (
                <ConfirmationModal
                  text="profilo"
                  onConfirm={() => {
                    handleAccountConfirm(currentAccount[0].id);
                  }}
                  onCancel={handleAccountCancel}
                />
              )}
            </div>
            <h3 className="ads-h3">I tuoi annunci:</h3>
            <div className="dash-ads-container">
              {userAds &&
                userAds.map((userAd, i) => {
                  return (
                    <div className="dash-ad-element" key={i}>
                      <div className="num">
                        <p>{i + 1}</p>
                      </div>
                      <p>{userAd.title}</p>
                      <div className="btns">
                        <Link to={`/ad/` + userAd.id}>
                          <button className="log-btn">Vai</button>
                        </Link>
                        <button className="delete-btn" onClick={handleDeleteAdClick}>
                          <BsFillTrash3Fill />
                        </button>
                        {showAdConfirm && (
                          <ConfirmationModal
                            text="annuncio"
                            onConfirm={() => {
                              handleAdConfirm(userAd.id);
                            }}
                            onCancel={handleAdCancel}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <h3 className="ads-h3">I tuoi commenti:</h3>
            <div className="dash-ads-container">
              {userComments &&
                userComments.map((userComment, i) => {
                  return (
                    <div className="dash-ad-element" key={i}>
                      <div className="num">
                        <p>{i + 1}</p>
                      </div>
                      <div className="comment-text-info">
                        <p>
                          {userComment.content.length < 50
                            ? userComment.content
                            : userComment.content.slice(0, 50) + "..."}
                        </p>
                        <p>
                          Annuncio:{" "}
                          {userComment.ad.title.length < 50
                            ? userComment.ad.title
                            : userComment.ad.title.slice(0, 50) + "..."}
                        </p>
                      </div>
                      <div className="btns">
                        <Link to={`/ad/` + userComment.ad.id}>
                          <button className="log-btn">Vai</button>
                        </Link>
                        <button className="delete-btn" onClick={handleDeleteCommentClick}>
                          <BsFillTrash3Fill />
                        </button>
                        {showCommentConfirm && (
                          <ConfirmationModal
                            text="commento"
                            onConfirm={() => {
                              handleCommentConfirm(userComment.id);
                            }}
                            onCancel={handleCommentCancel}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </main>
  );
};
export default Dashboard;
