function PopupWithForm(props) {
    return (
      <section className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
        <div className="popup__container">
          {/* <button role="button" className = "popup__close" type="button" onClick = {props.onClose} aria-label = "Закрыть"></button> */}
          <button className = "popup__close" type="button" onClick = {props.onClose} aria-label = "Закрыть"></button>
          <h3 className="popup__name">{props.title}</h3>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button className="popup__submit" type="submit">{props.buttonName} </button>
          </form>  
        </div>
      </section>
    );
  }
  
  export default PopupWithForm;
