import React from 'react'
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-edit-button">
          <img onClick={props.onEditAvatar} className="profile__avatar" src={currentUser.avatar}  alt="аватар" />
        </button>
        <div className="profile__info">
          <div className="profile__naming">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить карточку"></button>
      </section>
      <section className="content">
        <ul className="elements">
          {props.cards.map((item) => (
            <Card
              card={item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;