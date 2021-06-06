import React from 'react';

import './PopupWithForm.css';

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
      <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className={props.isValid ? 'popup__save-button' : 'popup__save-button popup__save-button_disabled'} type="submit">
          {props.submitButtonText}
        </button>
        <p className="popup__link-text">или <span className="popup__link" onClick={props.onLinkClick}>{props.linkText}</span></p>
        <button className="popup__close-button" type="button" onClick={props.onClose} aria-label="Закрыть окно."></button>
      </form>
    </div>
  )
}

export default PopupWithForm;
