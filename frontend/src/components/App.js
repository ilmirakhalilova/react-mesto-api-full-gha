import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
// import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name:'', about:'' });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
    //Загрузка данных профиля и галерии карточек с сервера при открытии сайта
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then (([infoUser, cards]) => {
        //профиль
        setCurrentUser(infoUser);
        //отрисовка карточек
        setCards(cards);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    }
  },[loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true); 
  }
  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.setUserAvatar({avatar})
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(cardId) {
    api.deleteMyCard(cardId)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== cardId));
      //closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) =>{
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setLoggedIn(true);
            navigate('/', {replace: true})
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        {/* для регистрации пользователя */}
        <Route path="/sign-up" element={
          <>
            <Header email={''} link={'/sign-in'} text={"Войти"} />
            <Register />
          </>
        }/>

        {/* для авторизации пользователя */}
        <Route path="/sign-in" element={
          <>
            <Header email={''} link={'/sign-up'} text={"Регистрация"} />
            <Login handleLogin={handleLogin} setEmail={setEmail} />
          </>
        }/>


        <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace /> } />

        <Route path="/" element={
          <ProtectedRouteElement loggedIn={loggedIn} elements={
            <>
              <Header email={email} link={'/sign-in'} text={'Выйти'} setLoggedIn={setLoggedIn} />
              <Main
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onEditAvatar = {handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </>
          } />
        } />
      </Routes>

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
            
      <ImagePopup
        card={selectedCard} name="image"  onClose={closeAllPopups}
      />
            
      {/* <PopupWithForm 
        title="Вы уверены?" name="popup_delete" buttonName="Да"
      /> */}
        
    </CurrentUserContext.Provider>
  );
}

export default App;
