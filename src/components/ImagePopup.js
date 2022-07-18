function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-add-card ${card ? "popup__open" : ""}`}>
      <div className="popup__container-image">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__text">{card?.name}</p>
        <button
          className="popup__botton-close"
          onClick={onClose}
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
