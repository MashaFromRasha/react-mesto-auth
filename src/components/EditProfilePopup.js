import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const userContext = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      about: description,
      name: name,
    });
  }
  useEffect(() => {
    setName(userContext.name);
    setDescription(userContext.about);
  }, [userContext, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="-edit"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            autoFocus
            className="popup__input-name"
            id="name-input"
            type="text"
            name="username"
            placeholder="Введите имя"
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
            value={name || ""}
            required
          />
          <span className="popup__input-error name-input-error"></span>
          <input
            className="popup__input-name popup__input-name_type_user-job"
            id="job-input"
            type="text"
            name="about"
            placeholder="Введите вашу профессию"
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
            value={description || ""}
            required
          />
          <span className="popup__input-error job-input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
