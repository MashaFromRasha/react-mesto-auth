import React from "react";

import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from '../context/CurrentUserContext'
import { CardsContext } from '../context/CardsContext'
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import '../styles/App.css';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth.js';
import InfoToolTip from "./InfoToolTip";
import Menu from "./Menu";

function App() {
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.err(`Ошибка ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.err(`Ошибка ${err}`))
  }

  useEffect(() => {
    tokenCheck()
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([user, cardData]) => {
          setCurrentUser(user);
          setCards(cardData);
        })
        .catch((err) => console.err(`Ошибка ${err}`))
    }
  }, [loggedIn])


  function handleUpdateAvatar(data) {
    api.resetAvatar(data.avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => console.err(`Ошибка ${err}`))
  }


  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => console.err(`Ошибка ${err}`))
  }


  function handleAddPlace(title) {
    api.addCard(title.title, title.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.err(`Ошибка ${err}`))
  }


  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [userData, setUserData] = React.useState([]);
  const [isInfoToolTip, setInfoToolTip] = React.useState({});


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoToolTip({});
  }

  function handleRegister({ email, password }) {
    return auth.register(email, password)
      .then(() => {
        setInfoToolTip({ isOpen: true, status: true, messageText: "Вы успешно зарегистрировались!" })
        history.push('/sign-in');
      })
      .catch((err) => {
        setInfoToolTip({ isOpen: true, status: false, messageText: "Что-то пошло не так." })
        console.err(`Ошибка... ${err}`)
      })
  }


  function handleLogin({ email, password }) {
    return auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
          return data
        }
      })
      .catch((err) => {
        console.err(`Ошибка... ${err}`)
      })
  }


  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth.token(jwt).then((res) => {
        if (res) {
          console.log(res)
          let userData = {
            email: res.email
          }
          setLoggedIn(true);
          setUserData(userData.email);
          history.push('/');
        }
      })
        .catch((err) => {
          console.err(`Ошибка... ${err}`)
        })
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Switch>
            <ProtectedRoute
              exact
              path='/'
              loggedIn={loggedIn}>
              <Header>
                <Menu email={userData} signOut={signOut} />
              </Header>
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                setCards={setCards}
              />
            </ProtectedRoute>
            <Route path='/sign-up'>
              <Header>
                <Link className="header__link" to='/sign-in'>Войти</Link>
              </Header>
              <Register setInfoToolTip={setInfoToolTip} onRegister={handleRegister} />
            </Route>
            <Route path='/sign-in'>
              <Header>
                <Link className="header__link" to='/sign-up'>Зарегистрироваться</Link>
              </Header>
              <Login handleLogin={handleLogin} />
            </Route>
          </Switch>
          <Footer />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddCard={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoToolTip isOpen={isInfoToolTip.isOpen} onClose={closeAllPopups} config={isInfoToolTip} />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
