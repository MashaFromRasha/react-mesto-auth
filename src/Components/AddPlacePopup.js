import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="popup-add-card"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place-name"
        type="text"
        placeholder="Название"
        name="popup-input-place-name"
        minLength="2"
        maxLength="30"
        required 
        value={name}
        onChange={handleChangeName}
      />
            
      <span id="popup-input-place-name-error" className="popup__error"></span>
            
      <input 
        className="popup__input popup__input_type_photo" 
        type="url" 
        placeholder="Ссылка на фото"
        name="popup-input-url" 
        required 
        value={link}
        onChange={handleChangeLink}
      />

      <span id="popup-input-url-error" className="popup__error"></span>
    </PopupWithForm>
  )

}

export default AddPlacePopup;