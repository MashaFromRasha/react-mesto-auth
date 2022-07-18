import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ 
  onUpdateAvatar, 
  isOpen, 
  onClose 
}) {
  const input = React.useRef();

  useEffect(() => {
    input.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: input.current.value,
    });
  }

  return (
    <PopupWithForm
      name="-avatar"
      title="Обновить аватар"
      button="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      children={
        <>
          <input
            className="popup__input-name popup__input-name_type_user-job"
            id="avatar-input"
            type="url"
            name="profileAvatar"
            placeholder="Ссылка на картинку"
            ref={input}
            required
          />
          <span className="popup__input-error avatar-input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
