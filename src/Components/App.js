import React, {useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

import ProtectedRoute from './ProtectedRoute';

import { Route, Switch } from 'react-router-dom';

import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: 'Loading...',
    about: ''
  });

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) =>  {
        const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard);
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }


  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((elem) => elem._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }


  useEffect(() => {
    api.getInitialData()
      .then(
        (data) => {
          const [userData, cardsData] = data;
          setCards(cardsData);
          setCurrentUser(userData);
      })
      .catch(err => console.log(`Error: ${err}`));
  }, []);


  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }


  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }


  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(
        (data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);

    setSelectedCard(null);
  }

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }


  return (
    <div>
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Switch>
        <Route path="/sign-up">

        </Route>
        <Route path="/sign-in">

        </Route>
        <ProtectedRoute
          path="/"
          component={Main}
          loggedIn={loggedIn}
          cards={cards}
          onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
      </Switch>


      <Footer />


      {/* Popup редактирования профиля */}
      <EditProfilePopup

        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />


      {/* Popup добавления новой карточки */}
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      {/* Popup обновления аватара */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />


      {/* Popup подтверждения удаления карточки */}
      <PopupWithForm
        name={"popup-remove-card"}
        title={"Вы уверены?"}
        textButton={"Да"}
      />

      {/* Popup просмотра фото */}
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
