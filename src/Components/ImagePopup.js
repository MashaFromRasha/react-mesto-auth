import React from 'react'

function ImagePopup(props) {
  return(
    <section className={`popup ${props.card.link ? 'popup_is-opened' : ''}`}>    
      <figure className="popup__figure">
        <button type="button" className="popup__close" onClick={props.onClose}  aria-label="Кнопка закрытия попапа" >
        </button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__caption">{props.card.name}</figcaption>

      </figure>
    </section>
  ) 
}


export default ImagePopup