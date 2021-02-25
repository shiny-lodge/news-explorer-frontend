import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import logoutIcon from '../../images/logout.svg';
import logoutIconDark from '../../images/logout-dark.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <nav className={
      props.activePage === 'main'
        ? props.mobileMenuOpened ? 'navigation navigation_opened' : 'navigation'
        : props.mobileMenuOpened ? 'navigation navigation_bg_white navigation_opened' : 'navigation'
    }>
      <Link className={props.activePage === 'main'
        ? 'navigation__link navigation__underline navigation__underline_color_white'
        : 'navigation__link navigation__link_color_dark'}
        to="/"
        onClick={props.setMainPageActive}>
        Главная
        </Link>
      {props.loggedIn &&
        <Link className={props.activePage === 'main'
          ? 'navigation__link navigation__link_color_gray'
          : 'navigation__link navigation__link_color_dark navigation__underline navigation__underline_color_dark'}
          to="/saved-news"
          onClick={props.setSavedNewsPageActive}>
          Сохранённые статьи
      </Link>}
      {props.loggedIn
        ? <button className={props.activePage === 'main'
          ? 'navigation__logout-button'
          : 'navigation__logout-button navigation__logout-button_color_dark'}
          type="button"
          onClick={props.onSignOut}
        >
          {currentUser.name}
          <img className="navigation__logout-icon" src={props.activePage === 'main' ? logoutIcon : logoutIconDark} alt="Иконка выхода." />
        </button>
        : <button className="navigation__auth-button" type="button" onClick={props.openLoginPopup}>Авторизоваться</button>}
    </nav>
  )
}

export default Navigation;
