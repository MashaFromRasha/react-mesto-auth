import React, {useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ 
  onUpdateUser, 
  isOpen, 
  onClose
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function hanldeChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  return ( 

    <PopupWithForm
    name="popup-profile"
    title="Редактировать профиль"
    textButton="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >

    <input 
      className="popup__input popup__input_type_author" 
      type="text" 
      placeholder="Ваше имя" 
      aria-label="Имя"
      name="name" 
      minLength="2" 
      maxLength="40" 
      required 
      onChange={handleChangeName} 
      value={name || ""}
    />
    <span id="popup-input-name-error" className="popup__error"></span>

    <input 
      className="popup__input popup__input_type_status" 
      type="text" 
      placeholder="Расскажите о себе" 
      aria-label="Подпись"
      name="about" 
      minLength="2" 
      maxLength="200" 
      required
      onChange={hanldeChangeDescription}
      value={description || ""}
    />
    <span id="popup-input-status-error" className="popup__error"></span>
  </PopupWithForm>
  )
}

export default EditProfilePopup;