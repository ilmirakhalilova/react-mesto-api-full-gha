import React from "react";
import { Link } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccessfulRegistration, setIsSuccessfulRegistration] = React.useState(false);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function closeInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password)
    .then(() => {
      setIsSuccessfulRegistration(true);
      setEmail('');
      setPassword('');
    })
    .catch((err) => {
      setIsSuccessfulRegistration(false);
      console.log('Ошибка: ' + err);
    })
    .finally(() => {
      setIsInfoTooltipPopupOpen(true);
    })
  }

  return(
    <>
      <div className="login">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input className="login__input" value={email} onChange={handleEmail} type="email" placeholder="Email" required />
          <input className="login__input" value={password} onChange={handlePassword} type="password" placeholder="Пароль" required />
          <button className="login__button" type="submit">Зарегестрироваться</button>
        </form>
        <p className="login__subtitle">Уже зарегестрированы? <Link className="link" to="/sign-in">Войти</Link></p>
      </div>

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeInfoTooltipPopupOpen}
        isSuccessfulRegistration={isSuccessfulRegistration}
      />
    </>
  );
}

export default Register;