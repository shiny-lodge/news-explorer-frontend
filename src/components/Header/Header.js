import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  return (
    <header className={
      props.activePage === 'main'
        ? props.mobileMenuOpened ? 'header header_bg_dark' : 'header'
        : 'header header_bg_white'}>
      <Link className={props.activePage === 'main' ? 'header__logo' : 'header__logo header__logo_color_dark'} to="/" onClick={props.setMainPageActive}>
        NewsExplorer
      </Link>
      <button className={
        props.activePage === 'main'
          ? props.mobileMenuOpened ? 'header__menu-button header__menu-button_opened_white' : 'header__menu-button'
          : props.mobileMenuOpened ? 'header__menu-button header__menu-button_color_dark header__menu-button_opened_dark' : 'header__menu-button header__menu-button_color_dark'
      }
        type="button"
        aria-label="Кнопка меню"
        onClick={props.toggleMobileMenu}></button>
      <Navigation
        activePage={props.activePage}
        setMainPageActive={props.setMainPageActive}
        setSavedNewsPageActive={props.setSavedNewsPageActive}
        loggedIn={props.loggedIn}
        mobileMenuOpened={props.mobileMenuOpened}
        openLoginPopup={props.openLoginPopup}
        onSignOut={props.onSignOut}
        currentUser={props.currentUser}
      />
    </header>
  )
}

export default Header;
