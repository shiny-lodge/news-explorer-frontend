import React, { useCallback, useRef } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import { queryResultsMockup, savedNewsMockup } from '../../utils/mockups.js'

function App(props) {
  const history = useHistory();

  const [activePage, setActivePage] = React.useState('main');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [searchQueryResults, setSearchQueryResults] = React.useState(queryResultsMockup);
  const [savedNews, setSavedNews] = React.useState(savedNewsMockup);
  const [mobileMenuOpened, setMobileMenuOpened] = React.useState(false);
  const [loginPopupOpened, setLoginPopupOpened] = React.useState(false);
  const [registerPopupOpened, setRegisterPopupOpened] = React.useState(false);
  const loginPopupOpenedRef = useRef();
  loginPopupOpenedRef.current = loginPopupOpened;

  function setMainPageActive() {
    setActivePage('main');
  }

  function setSavedNewsPageActive() {
    setActivePage('saved-news');
  }

  function toggleMobileMenu() {
    setMobileMenuOpened(!mobileMenuOpened);
  }

  function onKeydown(evt) {
    if (evt.key === 'Escape') {
      loginPopupOpenedRef.current ? closeLoginPopup() : closeRegisterPopup();
    }
  }

  const memoizedOnKeydown = useCallback(onKeydown, []);

  function onOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      loginPopupOpenedRef.current ? closeLoginPopup() : closeRegisterPopup();
    }
  }

  const memoizedOnOverlayClick = useCallback(onOverlayClick, []);

  function openLoginPopup() {
    document.addEventListener('keydown', memoizedOnKeydown);
    document.querySelector('.popup_type_login').addEventListener('click', memoizedOnOverlayClick);
    setLoginPopupOpened(true);
  }

  function closeLoginPopup() {
    setLoginPopupOpened(false);
    document.querySelector('.popup_type_login').removeEventListener('click', memoizedOnOverlayClick);
    document.removeEventListener('keydown', memoizedOnKeydown);
  }

  function openRegisterPopup() {
    document.addEventListener('keydown', memoizedOnKeydown);
    document.querySelector('.popup_type_register').addEventListener('click', memoizedOnOverlayClick);
    setRegisterPopupOpened(true);
  }

  function closeRegisterPopup() {
    setRegisterPopupOpened(false);
    document.querySelector('.popup_type_register').removeEventListener('click', memoizedOnOverlayClick);
    document.removeEventListener('keydown', memoizedOnKeydown);
  }

  function changePopup() {
    if (loginPopupOpened) {
      closeLoginPopup();
      openRegisterPopup();
    } else {
      closeRegisterPopup();
      openLoginPopup();
    }
  }

  function handleLogout() {
    setMainPageActive();
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <div className="page">
      <Header
        activePage={activePage}
        setMainPageActive={setMainPageActive}
        setSavedNewsPageActive={setSavedNewsPageActive}
        loggedIn={loggedIn}
        mobileMenuOpened={mobileMenuOpened}
        toggleMobileMenu={toggleMobileMenu}
        openLoginPopup={openLoginPopup}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route path="/" exact>
          <Main
            activePage={activePage}
            searchQueryResults={searchQueryResults}
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews setSavedNewsPageActive={setSavedNewsPageActive} savedNews={savedNews} />
        </Route>
      </Switch>
      <Footer setMainPageActive={setMainPageActive} />

      <LoginPopup loginPopupOpened={loginPopupOpened} onClose={closeLoginPopup} onLinkClick={changePopup} />
      <RegisterPopup registerPopupOpened={registerPopupOpened} onClose={closeRegisterPopup} onLinkClick={changePopup} />
    </div>
  )
}

export default App;
