import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Loader from "./Loader";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (

    <div>
      {props.isLoading && (<Loader />)}

      <section className={`profile  ${props.isLoading && "page__profile_hidden"}`}>
       
          <div className="profile__avatar-block">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар пользователя"
            />
            <button
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
            />
          </div>

          <div className="profile__info-block">
            <div className="profile__edit-block">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                id="show-popup"
                aria-label="кнопка редактирования"
                onClick={props.onEditProfile}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>


        <button
          className="profile__button"
          id="show-card-popup"
          type="submit"
          aria-label="кнопка отправки формы"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="photos">
       
          {props.cards.map((card) => (            
             <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
            ))}
       
      </section>
    </div>
    
  );
}

export default Main;
