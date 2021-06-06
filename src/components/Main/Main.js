import React from 'react';

import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main(props) {
  return (
    <>
      <SearchForm
        searchQuery={props.searchQuery}
        searchQueryError={props.searchQueryError}
        onChange={props.handleSearchQueryChange}
        onSearch={props.onSearch}
      />
      {props.loading && <Preloader />}
      <NewsCardList
        activePage={props.activePage}
        searchQueryResultsShown={props.searchQueryResultsShown}
        searchQueryResultsHidden={props.searchQueryResultsHidden}
        handleShowMoreClick={props.handleShowMoreClick}
        loggedIn={props.loggedIn}
        onSaveButtonClick={props.onSaveButtonClick}
        searchQueryFailed={props.searchQueryFailed}
      />
      <About />
    </>
  )
}

export default Main;
