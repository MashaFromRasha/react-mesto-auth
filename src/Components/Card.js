import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import { useContext } from 'react';

function Card({ 
  card, 
  onCardClick, 
  onCardLike, 
  onCardDelete 
}) {

  const currentUser = useContext(CurrentUserContext);

  const isOwnCard = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = `${isOwnCard ? 'card__button-remove card__button-remove_visible' : 'card__button-remove card__button-remove_hidden'}`;
  const cardLikeButtonClassName = `${isLiked ? 'card__button-like card__button-like_active' : 'card__button-like'}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        alt={`Фото ${card.name}`}
        src={card.link}
        onClick={handleCardClick}
      />
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete} type="button" aria-label="Удалить карточку" />
      <div className="card__row-block">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Поставить лайк" />
          <span className="card__score-like">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;