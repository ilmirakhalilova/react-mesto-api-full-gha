import successIcon from '../images/successIcon.svg';
import errorIcon from '../images/errorIcon.svg';

function InfoTooltip(props) {
  return(
    <div className={`popup popup__infoTooltip ${props.isOpen && "popup_opened"}`}>
      <div className='popup__container'>
        {/* <button onClick={props.onClose} role="button" className="popup__close popup__close_image" type="button" aria-label="Закрыть"></button> */}
        <button onClick={props.onClose} className="popup__close popup__close_image" type="button" aria-label="Закрыть"></button>
        <img className="popup__infoTooltipIcon"
          src={props.isSuccessfulRegistration ? successIcon : errorIcon}
          alt={props.isSuccessfulRegistration ? "Успешная регистрация" : "Ошибка регистрации"} />
        <p className="popup__infoTooltipMessage">{props.isSuccessfulRegistration ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;