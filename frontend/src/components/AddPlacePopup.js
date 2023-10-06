import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: url
    });
  }

  React.useEffect(() => {
    setName('');
    setUrl('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="popup_add"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonName="Создать"
    >
      <div className="popup__form-input">
        <input id="place-name" name="place-name" className="popup__input popup__input_new_place" value={name} onChange={handleEditName} type="text" placeholder="Название" minLength="2" maxLength="30" required/>
        <span id="place-name-error" className="popup__message"></span>
      </div>
      <div className="popup__form-input">
        <input id="link-place" name="link-place" className="popup__input popup__input_link_place" value={url} onChange={handleUrlChange} type="url" placeholder="Ссылка на картинку" required/>
        <span id="link-place-error" className="popup__message"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;