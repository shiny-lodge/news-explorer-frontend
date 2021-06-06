import React from 'react';

import './Login.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Login(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(props.values.email, props.values.password);
  }

  return (
    <PopupWithForm
      name="login"
      title="Вход"
      isOpen={props.loginPopupOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonText="Войти"
      linkText="Зарегистрироваться"
      onLinkClick={props.onLinkClick}
      isValid={props.isValid}
    >
      <p className="popup__input-title">Email</p>
      <input className="popup__input" type="email" name="email" placeholder="Введите почту" required pattern="[a-zA-Z0-9\-._]+@[a-zA-Z]+\.[a-zA-Z]+"
        value={props.values.email || ''} onChange={props.handleChange} />
      <span className={props.errors.email ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'}>
        {props.errors.email}
      </span>
      <p className="popup__input-title">Пароль</p>
      <input className="popup__input" type="password" name="password" placeholder="Введите пароль" required
        value={props.values.password || ''} onChange={props.handleChange} />
      <span className={props.errors.password ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'}>
        {props.errors.password}
      </span>

      <span className="popup__submit-error">{props.submitError}</span>
    </PopupWithForm>
  )
}

export default Login;
