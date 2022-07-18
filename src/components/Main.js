import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { CardsContext } from "../context/CardsContext";
function Main({
  onAddPlace,
  onCardClick,
  onEditProfile,
  onEditAvatar,
  setCards,
  onCardLike,
  onCardDelete,
}) {
  const cards = React.useContext(CardsContext);
  const userContext = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-wrapper">
            <img
              className="profile__image"
              src={userContext.avatar}
              alt={userContext.name}
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__intro">
            <div className="profile__box">
              <h1 className="profile__title">{userContext.name}</h1>
              <button
                className="profile__botton-edit"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{userContext.about}</p>
          </div>
        </div>
        <button
          className="profile__button-full"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            userContext={userContext}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            card={card}
            key={card._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
