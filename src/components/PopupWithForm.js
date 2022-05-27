import React from 'react';


function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={props.onClose} aria-label="Закрыть форму" >
        </button>
        <h2 className="popup__heading">{props.title}</h2>
        <form className={`popup__field-form popup__field-form-${props.name}`} onSubmit={props.onSubmit}>         
          {props.children}
          <button type="submit" className="popup__button" alt="Кнопка отправки формы">
            {props.buttonText}          
          </button>
        </form>
      </div>
    </div>
  ); 
}

export default PopupWithForm