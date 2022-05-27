import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `card__button-remove card__button-remove_visible ${
    isOwn ? "card__button-remove card__button-remove_visible" : "card__button-remove card__button-remove_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__button-like ${
    isLiked ? "card__button-like_active" : ""
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }


  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={`Фото ${props.card.name}`}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
        aria-label="Удалить карточку"
      />
      <div className="card__row-block">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="submit"
            onClick={handleLikeClick}
            aria-label="Поставить лайк"
          />
          <span className="card__score-like">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
