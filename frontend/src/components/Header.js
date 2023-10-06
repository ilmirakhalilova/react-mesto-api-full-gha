import logoPath from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {

  function onSignOut() {
    localStorage.removeItem('token');
    props.setLoggedIn(false);
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="логотип в шапке"/>
      <div className="header__container">
        <p className="header__email">{props.email}</p>
        <Link className="header__link link" to={props.link} onClick={onSignOut}>
          {props.text}
        </Link>
      </div>
    </header>
  );
}

export default Header;