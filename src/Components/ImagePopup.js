function ImagePopup({ card, onClose }) {

  return (
    <section className={`popup ${card ? "popup_opened" : ""}`} id="popup-open-image">
      <figure className="popup__figure">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть просмотр фотографии">
        </button>
        <img
          className="popup__image"
          alt={`Фото ${card?.name}`}
          src={card?.link}
        />
        <figcaption className="popup__caption">{card?.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;