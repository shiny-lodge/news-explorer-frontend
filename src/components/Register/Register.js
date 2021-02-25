import React from 'react';

import './Register.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Register(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(props.values.email, props.values.password, props.values.name);
  }

  return (
    <PopupWithForm
      name="register"
      title="Регистрация"
      isOpen={props.registerPopupOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonText="Зарегистрироваться"
      linkText="Войти"
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

      <p className="popup__input-title">Имя</p>
      <input className="popup__input" type="text" name="name" minLength="2" maxLength="30" placeholder="Введите своё имя" required
        value={props.values.name || ''} onChange={props.handleChange} />
      <span className={props.errors.name ? 'popup__input-error popup__input-error_visible' : 'popup__input-error'}>
        {props.errors.name}
      </span>

      <span className="popup__submit-error">{props.submitError}</span>
    </PopupWithForm>
  )
}

export default Register;
