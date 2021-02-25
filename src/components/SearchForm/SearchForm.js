import React from 'react';

import './SearchForm.css';

function SearchForm(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSearch();
  }

  return (
    <section className="search-form page__search-form">
      <div className="search-form__container">
        <h1 className="search-form__title">Что творится в мире?</h1>
        <p className="search-form__paragraph">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      </div>
      <form className="search-form__search-bar" onSubmit={handleSubmit} noValidate>
        <input className="search-form__input" type="text" placeholder="Введите тему новости" required
          value={props.query} onChange={props.onChange} />
        <button className="search-form__submit-button" type="submit">Искать</button>
      </form>
      {props.searchQueryError && <p className="search-form__input-error">{props.searchQueryError}</p>}
    </section>
  )
}

export default SearchForm;
