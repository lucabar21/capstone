import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/sub_components/Spinner";
import { BsFillTrash3Fill } from "react-icons/bs";
import ConfirmationModal from "../../components/sub_components/ConfirmationModal";
import Messages from "../../components/Messages";

const AdminDashboard = () => {
  //   const user = useSelector((state) => state.auth.user);
  const [selectedUser, setSelectedUser] = useState(null);
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
        window.location.reload();
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
  const handleDeleteAccountClick = (user_id) => {
    setSelectedUser(user_id);
    setShowAccountConfirm(true);
    console.log(selectedUser);
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

  const normalUsers = users ? users.filter((user) => user.role === "user") : null;
  return (
    <main>
      {normalUsers ? (
        <>
          <div className="main-dash">
            <div className="left-admin">
              <div className="main-admin-container">
                <h3 className="admin-h3">Admin Dashboard</h3>
                <div className="admin-dashboard-container">
                  {normalUsers.map((user) => (
                    <div className="admin-profile-details" key={user.id}>
                      <div>
                        <p> ID: {user.id}</p> <p> Nome: {user.name}</p> <p> Cognome: {user.surname}</p>{" "}
                        <p>Email: {user.email}</p>
                      </div>
                      <button className="delete-btn" onClick={() => handleDeleteAccountClick(user.id)}>
                        <BsFillTrash3Fill />
                      </button>
                    </div>
                  ))}
                  {showAccountConfirm && (
                    <ConfirmationModal
                      text="profilo"
                      onConfirm={() => {
                        handleAccountConfirm(selectedUser);
                      }}
                      onCancel={handleAccountCancel}
                    />
                  )}
                </div>
                <h3 className="ads-h3">Gli annunci:</h3>
                <div className="dash-ads-container">
                  {ads &&
                    ads.map((ad, i) => {
                      return (
                        <div className="dash-ad-element" key={i}>
                          <div className="num">
                            <p>{ad.id}</p>
                          </div>
                          <div className="comment-text-info">
                            <p>{ad.title.length < 50 ? ad.title : ad.title.slice(0, 50) + "..."}</p>
                            <p>ID autore: {ad.user_id}</p>
                          </div>
                          <div className="btns">
                            <Link to={`/ad/` + ad.id}>
                              <button className="log-btn">Vai</button>
                            </Link>
                            <button className="delete-btn" onClick={handleDeleteAdClick}>
                              <BsFillTrash3Fill />
                            </button>
                            {showAdConfirm && (
                              <ConfirmationModal
                                text="annuncio"
                                onConfirm={() => {
                                  handleAdConfirm(ad.id);
                                }}
                                onCancel={handleAdCancel}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <h3 className="ads-h3">I commenti:</h3>
                <div className="dash-ads-container">
                  {comments &&
                    comments.map((comment, i) => {
                      return (
                        <div className="dash-ad-element" key={i}>
                          <div className="num">
                            <p>{comment.id}</p>
                          </div>
                          <div className="comment-text-info">
                            <p>
                              {comment.content.length < 50 ? comment.content : comment.content.slice(0, 50) + "..."}
                            </p>
                            <p>
                              Annuncio:{" "}
                              {comment.ad.title.length < 50 ? comment.ad.title : comment.ad.title.slice(0, 50) + "..."}
                            </p>
                          </div>
                          <div className="btns">
                            <Link to={`/ad/` + comment.ad.id}>
                              <button className="log-btn">Vai</button>
                            </Link>
                            <button className="delete-btn" onClick={handleDeleteCommentClick}>
                              <BsFillTrash3Fill />
                            </button>
                            {showCommentConfirm && (
                              <ConfirmationModal
                                text="commento"
                                onConfirm={() => {
                                  handleCommentConfirm(comment.id);
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
            </div>
            <div className="right-admin">
              <h3>Messaggi</h3>
              <Messages />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </main>
  );
};
export default AdminDashboard;
