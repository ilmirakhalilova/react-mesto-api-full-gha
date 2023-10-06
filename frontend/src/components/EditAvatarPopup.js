import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар" name="popup_update-avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName="Сохранить">
      <div className="popup__form-input">
        <input id="linkavatar" name="linkavatar" className="popup__input popup__input_link_avatar" ref={avatarRef} type="url" placeholder="Ссылка на картинку" defaultValue="" required/>
        <span id="linkavatar-error" className="popup__message"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;