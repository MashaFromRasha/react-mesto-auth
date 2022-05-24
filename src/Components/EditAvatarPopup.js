import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const [inputValue, setInputValue] = useState('');

  function handleChangeAvatar(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputValue,
    });
    setInputValue('');
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_type_photo"
        type="url"
        placeholder="Ссылка на аватар"
        name="popup-input-url-avatar"
        required
        onChange={handleChangeAvatar}
        value={inputValue}
      />
      <span id="popup-input-url-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;