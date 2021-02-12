import React from 'react';

import './SearchForm.css';

function SearchForm(props) {
  return (
    <section className="search-form page__search-form">
      <div className="search-form__container">
        <h1 className="search-form__title">Что творится в мире?</h1>
        <p className="search-form__paragraph">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      </div>
      <div className="search-form__search-bar">
        <input className="search-form__input" type="text" id="query-input" name="query" placeholder="Введите тему новости" required />
        <button className="search-form__submit-button" type="submit">Искать</button>
      </div>
    </section>
  )
}

export default SearchForm;
