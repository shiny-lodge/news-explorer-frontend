import React, { useCallback, useRef } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { register, login, checkAuth, createArticle, deleteArticle, getArticles } from '../../utils/MainApi';
import { searchNews } from '../../utils/NewsApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App(props) {
  const history = useHistory();

  const [activePage, setActivePage] = React.useState('main');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [searchQueryResultsShown, setSearchQueryResultsShown] = React.useState(null);
  const [searchQueryResultsHidden, setSearchQueryResultsHidden] = React.useState([]);
  const [savedNews, setSavedNews] = React.useState([]);
  const [sortedKeywords, setSortedKeywords] = React.useState([]);
  const [mobileMenuOpened, setMobileMenuOpened] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchQueryError, setSearchQueryError] = React.useState('');
  const [loading, setLoading] = React.useState('');
  const [searchQueryFailed, setSearchQueryFailed] = React.useState(false);

  // Для открытия-закрытия попапов
  const [loginPopupOpened, setLoginPopupOpened] = React.useState(false);
  const loginPopupOpenedRef = useRef();
  loginPopupOpenedRef.current = loginPopupOpened;
  const [registerPopupOpened, setRegisterPopupOpened] = React.useState(false);
  const registerPopupOpenedRef = useRef();
  registerPopupOpenedRef.current = registerPopupOpened;
  const [successPopupOpened, setSuccessPopupOpened] = React.useState(false);

  // Для валидации форм
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  function handleInputChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
  };
  function resetForm() {
    setValues({});
    setErrors({});
    setIsValid(false);
    setSubmitError('');
  }

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
      if (loginPopupOpenedRef.current) {
        closeLoginPopup();
      } else if (registerPopupOpenedRef.current) {
        closeRegisterPopup();
      } else {
        closeSuccessPopup();
      }
    }
  }

  const memoizedOnKeydown = useCallback(onKeydown, []);

  function onOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      if (loginPopupOpenedRef.current) {
        closeLoginPopup();
      } else if (registerPopupOpenedRef.current) {
        closeRegisterPopup();
      } else {
        closeSuccessPopup();
      }
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
    resetForm();
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
    resetForm();
  }

  function openSuccessPopup() {
    document.addEventListener('keydown', memoizedOnKeydown);
    document.querySelector('.popup_type_success').addEventListener('click', memoizedOnOverlayClick);
    setSuccessPopupOpened(true);
  }

  function closeSuccessPopup() {
    setSuccessPopupOpened(false);
    document.querySelector('.popup_type_success').removeEventListener('click', memoizedOnOverlayClick);
    document.removeEventListener('keydown', memoizedOnKeydown);
  }

  function changePopup() {
    if (loginPopupOpened) {
      closeLoginPopup();
      openRegisterPopup();
    } else if (registerPopupOpened) {
      closeRegisterPopup();
      openLoginPopup();
    } else {
      closeSuccessPopup();
      openLoginPopup();
    }
  }

  function onSignOut() {
    localStorage.removeItem('loggedIn');
    setMainPageActive();
    setLoggedIn(false);
    history.push('/');
  }

  function onRegister(email, password, name) {
    register(email, password, name)
      .then(response => {
        if (response.data) {
          closeRegisterPopup()
          openSuccessPopup();
        } else {
          setSubmitError(response.message);
        }
      })
      .catch(error => console.log(error));
  }

  function onLogin(email, password) {
    login(email, password)
      .then(response => {
        if (response.data) {
          localStorage.setItem('loggedIn', 'true');
          setCurrentUser(response.data);
          setLoggedIn(true);
          closeLoginPopup();
        } else {
          setSubmitError(response.message);
        }
      })
      .catch(error => console.log(error));
  }

  function onSaveButtonClick(card) {
    if (!loggedIn) {
      openRegisterPopup();
    } else {
      if (!card.isSaved) {
        createArticle(searchQuery, card.title, card.description, card.publishedAt, card.source.name, card.url, card.urlToImage)
          .then(response => {
            if (response.data) {
              const newSearchQueryResultsShown = [...searchQueryResultsShown];
              const index = newSearchQueryResultsShown.findIndex(item => {
                return item.title === card.title && item.description === card.description && item.publishedAt === card.publishedAt
                  && item.source.name === card.source.name && item.url === card.url && item.urlToImage === card.urlToImage;
              });
              newSearchQueryResultsShown[index].isSaved = true;
              newSearchQueryResultsShown[index]._id = response.data._id;
              localStorage.setItem('searchQueryResultsShown', JSON.stringify(newSearchQueryResultsShown));
              setSearchQueryResultsShown(newSearchQueryResultsShown);
            }
          })
          .catch(error => console.log(error));
      } else {
        deleteArticle(card._id)
          .then(response => {
            if (response.data) {
              const newSearchQueryResultsShown = [...searchQueryResultsShown];
              const index = newSearchQueryResultsShown.findIndex(item => {
                return item.title === card.title && item.description === card.description && item.publishedAt === card.publishedAt
                  && item.source.name === card.source.name && item.url === card.url && item.urlToImage === card.urlToImage;
              });
              newSearchQueryResultsShown[index].isSaved = false;
              delete newSearchQueryResultsShown[index]._id;
              localStorage.setItem('searchQueryResultsShown', JSON.stringify(newSearchQueryResultsShown));
              setSearchQueryResultsShown(newSearchQueryResultsShown);
            }
          })
          .catch(error => console.log(error));
      }
    }
  }

  function onDeleteButtonClick(card) {
    deleteArticle(card._id)
      .then(response => {
        if (response.data) {
          const newSearchQueryResultsShown = [...searchQueryResultsShown];
          const index = newSearchQueryResultsShown.findIndex(item => item._id === card._id);
          if (index >= 0) {
            newSearchQueryResultsShown[index].isSaved = false;
            delete newSearchQueryResultsShown[index]._id;
            localStorage.setItem('searchQueryResultsShown', JSON.stringify(newSearchQueryResultsShown));
            setSearchQueryResultsShown(newSearchQueryResultsShown);
          }
          getArticlesOnSavedNewsMount();
        }
      })
      .catch(error => console.log(error));
  }

  function handleSearchQueryChange(evt) {
    if (!evt.target.value.trim()) {
      setSearchQueryError('Нужно ввести ключевое слово');
    } else {
      setSearchQueryError('');
    }
    setSearchQuery(evt.target.value);
  }

  function onSearch() {
    if (searchQuery.trim()) {
      setLoading(true);
      setSearchQueryFailed(false);
      searchNews(searchQuery)
        .then(response => {
          if (response.status === 'ok') {
            response.articles = response.articles.map(item => ({
              ...item,
              isSaved: false
            }));
            if (response.articles.length > 0) {
              localStorage.setItem('searchQueryResultsShown', JSON.stringify(response.articles.slice(0, 3)));
              localStorage.setItem('searchQuery', searchQuery);
            } else {
              localStorage.removeItem('searchQueryResultsShown');
              localStorage.removeItem('searchQuery');
            }
            setSearchQueryResultsShown(response.articles.slice(0, 3));
            localStorage.setItem('searchQueryResultsHidden', JSON.stringify(response.articles.slice(3)));
            setSearchQueryResultsHidden(response.articles.slice(3));
            setLoading(false);
          } else {
            setSearchQueryFailed(true);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setSearchQueryError('Нужно ввести ключевое слово');
    }
  }

  function handleShowMoreClick() {
    localStorage.setItem('searchQueryResultsShown', JSON.stringify([...searchQueryResultsShown, ...searchQueryResultsHidden.slice(0, 3)]));
    setSearchQueryResultsShown([...searchQueryResultsShown, ...searchQueryResultsHidden.slice(0, 3)]);
    localStorage.setItem('searchQueryResultsHidden', JSON.stringify(searchQueryResultsHidden.slice(3)));
    setSearchQueryResultsHidden(searchQueryResultsHidden.slice(3));
  }

  function getArticlesOnSavedNewsMount() {
    getArticles()
      .then(response => {
        if (response.data) {
          const keywordMap = response.data.map(item => item = item.keyword)
            .reduce((acc, current) => {
              acc[current] = (acc[current] || 0) + 1;
              return acc;
            }, {});
          const sortedKeywords = Object.keys(keywordMap).sort((a, b) => keywordMap[b] - keywordMap[a]);
          setSavedNews(response.data);
          setSortedKeywords(sortedKeywords);
        } else if (response.message === 'Статьи не найдены') {
          setSavedNews([]);
          setSortedKeywords([]);
        }
      })
      .catch(error => console.log(error));
  }

  React.useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const searchQueryResultsShown = JSON.parse(localStorage.getItem('searchQueryResultsShown'));
    const searchQueryResultsHidden = JSON.parse(localStorage.getItem('searchQueryResultsHidden')) || [];
    const searchQuery = localStorage.getItem('searchQuery') || '';
    setSearchQueryResultsShown(searchQueryResultsShown);
    setSearchQueryResultsHidden(searchQueryResultsHidden);
    setSearchQuery(searchQuery);
    checkAuth()
      .then(response => {
        if (response.data && loggedIn === 'true') {
          setCurrentUser(response.data);
          setLoggedIn(true);
        } else if (loggedIn === 'true') {
          localStorage.removeItem('loggedIn');
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          activePage={activePage}
          setMainPageActive={setMainPageActive}
          setSavedNewsPageActive={setSavedNewsPageActive}
          loggedIn={loggedIn}
          mobileMenuOpened={mobileMenuOpened}
          toggleMobileMenu={toggleMobileMenu}
          openLoginPopup={openLoginPopup}
          onSignOut={onSignOut}
          currentUser={currentUser}
        />
        <Switch>
          <Route exact path="/">
            <Main
              activePage={activePage}
              searchQueryResultsShown={searchQueryResultsShown}
              searchQueryResultsHidden={searchQueryResultsHidden}
              handleShowMoreClick={handleShowMoreClick}
              loggedIn={loggedIn}
              onSaveButtonClick={onSaveButtonClick}
              searchQuery={searchQuery}
              searchQueryError={searchQueryError}
              handleSearchQueryChange={handleSearchQueryChange}
              onSearch={onSearch}
              loading={loading}
              searchQueryFailed={searchQueryFailed}
            />
          </Route>
          <ProtectedRoute path="/saved-news"
            loggedIn={loggedIn}
            setSavedNewsPageActive={setSavedNewsPageActive}
            savedNews={savedNews}
            sortedKeywords={sortedKeywords}
            component={SavedNews}
            openLoginPopup={openLoginPopup}
            getArticles={getArticlesOnSavedNewsMount}
            onDeleteButtonClick={onDeleteButtonClick}
          />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer setMainPageActive={setMainPageActive} />

        <Login
          loginPopupOpened={loginPopupOpened}
          onClose={closeLoginPopup}
          onLinkClick={changePopup}
          onLogin={onLogin}
          submitError={submitError}
          values={values}
          errors={errors}
          isValid={isValid}
          handleChange={handleInputChange}
        />
        <Register
          registerPopupOpened={registerPopupOpened}
          onClose={closeRegisterPopup}
          onLinkClick={changePopup}
          onRegister={onRegister}
          submitError={submitError}
          values={values}
          errors={errors}
          isValid={isValid}
          handleChange={handleInputChange}
        />
        <SuccessPopup
          isOpen={successPopupOpened}
          onLinkClick={changePopup}
          onClose={closeSuccessPopup}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
