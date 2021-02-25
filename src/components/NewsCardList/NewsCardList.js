import React from 'react';

import './NewsCardList.css';
import notFoundIcon from '../../images/not-found.svg';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  return (
    <>
      {
        props.activePage === 'main'
          ?
          (props.searchQueryResultsShown
            ?
            <section className="news-card-list">
              {props.searchQueryResultsShown.length > 0
                ?
                <div className="news-card-list__container">
                  <p className="news-card-list__subtitle">Результаты поиска</p>
                  <div className="news-card-list__results">
                    {props.searchQueryResultsShown.map((card, i) => (
                      <NewsCard card={card} key={i}
                        loggedIn={props.loggedIn}
                        activePage={props.activePage}
                        onSaveButtonClick={props.onSaveButtonClick}
                      />
                    ))}
                  </div>
                  {props.searchQueryResultsHidden.length > 0 && <button className="news-card-list__button" type="button" onClick={props.handleShowMoreClick}>Показать ещё</button>}
                </div>
                :
                <>
                  <img className="news-card-list__not-found-image" src={notFoundIcon} alt="Расстроенная лупа." />
                  <p className="news-card-list__not-found-subtitle">Ничего не найдено</p>
                  <p className="news-card-list__not-found-text">К сожалению по вашему запросу ничего не найдено.</p>
                </>
              }
            </section>
            :
            (props.searchQueryFailed && <p className="news-card-list__error">
              Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.
              </p>)
          )
          :
          <section className="news-card-list">
            <div className="news-card-list__container">
                <div className="news-card-list__results">
                  {props.savedNews.map((card, i) => (
                    <NewsCard card={card} key={i}
                      activePage={props.activePage}
                      onDeleteButtonClick={props.onDeleteButtonClick}
                    />
                  ))}
                </div>
              </div>
          </section>
      }
    </>
  )
}

export default NewsCardList;
