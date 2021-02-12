import React from 'react';

import './LoginPopup.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function LoginPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit() {

  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
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
    >
      <p className="popup__input-title">Email</p>
      <input className="popup__input" id="email-input" type="email" name="email"
        placeholder="Введите почту" required value={email} onChange={handleEmailChange} />
      <span className="popup__input-error" id="email-input-error"></span>
      <p className="popup__input-title">Пароль</p>
      <input className="popup__input" id="password-input" type="password" name="password"
        placeholder="Введите пароль" required value={password} onChange={handlePasswordChange} />
      <span className="popup__input-error" id="password-input-error" />
    </PopupWithForm>
  )
}

export default LoginPopup;
