function PopupWithForm({ 
  name, 
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  textButton
}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={"popup__container"}>
        <button
          className={"popup__button-close"}
          type={"button"}
          onClick={onClose}
          aria-label="Закрыть форму">
        </button>
        <h2 className={"popup__title"}>
          {title}</h2>
        <form
          className="popup__form"
          name={name}
          id={"popup-form-edit"}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={"popup__button-submit"}
            type={"submit"}
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;