import React from 'react';

import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function Main(props) {
  return (
    <>
      <SearchForm />
      {/* <Preloader /> */}
      <NewsCardList
        activePage={props.activePage}
        searchQueryResults={props.searchQueryResults}
        loggedIn={props.loggedIn}
      />
      <About />
    </>
  )
}

export default Main;
