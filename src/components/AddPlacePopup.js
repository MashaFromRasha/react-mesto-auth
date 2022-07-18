import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddCard }) {

  const [link, setLink] = React.useState("");
  const [title, setTitle] = React.useState("");

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      link: link,
      title: title,
    });
  }

  React.useEffect(() => {
    setLink('');
    setTitle('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="-image"
      title="Новое место"
      button="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      children={
        <>
          <input
            autoFocus
            className="popup__input-name"
            id="card-name-input"
            name="text"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleChangeTitle}
            value={title || ''}
            required
          />
          <span className="popup__input-error card-name-input-error"></span>
          <input
            className="popup__input-name popup__input-name_type_user-job"
            id="url-input"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            onChange={handleChangeLink}
            value={link || ''}
            required
          />
          <span className="popup__input-error url-input-error"></span>
        </>
      }
    />
  );
}
export default AddPlacePopup;
