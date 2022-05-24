import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from "../Contexts/CurrentUserContext";


function Main({
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {


  const currentUser = React.useContext(CurrentUserContext);

  
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__overlay">
          <img src={currentUser.avatar} alt={`Аватар пользователя ${currentUser.name}`} className="profile__avatar" />
          <button className="profile__avatar-button-edit" type="button" onClick={onEditAvatar} aria-label="Заменить аватар профиля"></button>
        </div>
        <div className="profile__text-block">
          <div className="profile__row-block">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" onClick={onEditProfile} aria-label="Изменить описание профиля"></button>
          </div>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddPlace} aria-label="Добавить новое фото"></button>
      </section>


      <section className="photos">
        {
          cards.map(item => 
          <Card 
          key={item._id} 
          card={item} 
          onCardClick={onCardClick} 
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          />)
        }
      </section>
    </main>
  );

}

export default Main;