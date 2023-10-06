import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleEditDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
        title="Редактировать профиль" name="popup_edit" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonName="Сохранить">
        <>
          <div className="popup__form-input">
            <input id="name" name="name" className="popup__input popup__input_type_name" value={name} onChange={handleEditName} placeholder="Имя" minLength="2" maxLength="40" required/>
            <span id="name-error" className="popup__message"></span>
          </div>
          <div className="popup__form-input">
            <input id="about" name="about" className="popup__input popup__input_type_about" value={description} onChange={handleEditDescription} placeholder="О себе" minLength="2" maxLength="200" required/>
            <span id="about-error" className="popup__message"></span>
          </div>
        </>
      </PopupWithForm>
  )
}

export default EditProfilePopup;