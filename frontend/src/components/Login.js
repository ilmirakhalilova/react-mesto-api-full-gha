import React from "react";
import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccessfulLogin, setIsSuccessfulLogin] = React.useState(false);

  const navigate = useNavigate();

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
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('token', data.token); // localStorage.setItem('jwt', data.token);
          props.setEmail(email);
          //setPassword('');
          props.handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessfulLogin(false);
        console.log('Ошибка: ' + err)
      });
  }

  return (
    <>
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input className="login__input" value={email} onChange={handleEmail} type="email" placeholder="Email" required />
          <input className="login__input" value={password} onChange={handlePassword} type="password" placeholder="Пароль" required />
          <button className="login__button" type="submit">Войти</button>
        </form>
      </div>
      
      <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeInfoTooltipPopupOpen}
          isSuccessfulLogin={isSuccessfulLogin}
        />
    </>
  );
}

export default Login;