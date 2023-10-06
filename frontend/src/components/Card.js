import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`elements__like ${isLiked ? 'elements__like_active' : ''}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
    <li className="elements__element">
      {isOwn && <button className="elements__delete" onClick={handleDeleteClick} type="button" aria-label="Удалить"></button>}
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="elements__caption">
        <h2 className="elements__name">{props.card.name}</h2>
        <div className="elements__grouplike">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"></button>
          <p className="elements__countlikes">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;