import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { useState, useEffect } from "react";
import { api } from "../utils/api.js";
import NewCard from "./Main/components/Popup/NewCard/NewCard.jsx";

export default function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const temCards = await api.getInitialCards();
        setCards(temCards);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((user) => {
        setCurrentUser(user);
      });
    })();
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.updateUserInfo(data).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((error) => console.error("Error al actualizar el avatar:", error));
  };

  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };
  const handleClosePopup = () => {
    setPopup(null);
  };

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api.deleteCard(card._id).then(() => {
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    });
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
