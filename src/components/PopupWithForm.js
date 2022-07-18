function PopupWithForm(props) {
    return (
        <>
    <div className={`popup popup${props.name} ${props.isOpen ? 'popup__open' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__botton-close" type="button" onClick={props.onClose}>
        </button>
        <form className="popup__form" onSubmit={props.onSubmit} name={`${props.name}`}>
          {props.children}
          <button type="submit" className="popup__button">
              <span className="popup__button-text">{props.button}</span>
            </button>
        </form>
      </div>
    </div>
    </>
    )
}

export default PopupWithForm;