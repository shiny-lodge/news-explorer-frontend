import React from 'react';

import './RegisterPopup.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  function handleSubmit() {

  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleUsernameChange(evt) {
    setUsername(evt.target.value);
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
    >
      <p className="popup__input-title">Email</p>
      <input className="popup__input" id="email-input" type="email" name="email"
        placeholder="Введите почту" required value={email} onChange={handleEmailChange} />
      <span className="popup__input-error" id="email-input-error"></span>
      <p className="popup__input-title">Пароль</p>
      <input className="popup__input" id="password-input" type="password" name="password"
        placeholder="Введите пароль" required value={password} onChange={handlePasswordChange} />
      <span className="popup__input-error" id="password-input-error" />
      <p className="popup__input-title">Имя</p>
      <input className="popup__input" id="username-input" type="text" name="username"
        placeholder="Введите своё имя" required value={username} onChange={handleUsernameChange} />
      <span className="popup__input-error" id="username-input-error" />
    </PopupWithForm>
  )
}

export default RegisterPopup;
