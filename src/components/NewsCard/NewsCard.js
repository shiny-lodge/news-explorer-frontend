import React from 'react';

import './NewsCard.css';

function NewsCard(props) {
  function handleSaveButtonClick() {
    props.onSaveButtonClick(props.card);
  }

  function handleDeleteButtonClick() {
    props.onDeleteButtonClick(props.card);
  }

  return (
    <div className="news-card">
      <a className="news-card__link" href={props.activePage === 'main' ? props.card.url : props.card.link} target="_blank" rel="noopener noreferrer">
        <img className="news-card__image" src={props.activePage === 'main' ? props.card.urlToImage : props.card.image} alt={props.card.title} />
        <div className="news-card__container">
          <p className="news-card__date">{props.activePage === 'main' ? formatDate(props.card.publishedAt) : formatDate(props.card.date)}</p>
          <div className="news-card__text-wrapper">
            <p className="news-card__title">{props.card.title}</p>
            <p className="news-card__description">{props.activePage === 'main' ? props.card.description : props.card.text}</p>
          </div>
          <p className="news-card__source">{props.activePage === 'main' ? props.card.source.name : props.card.source}</p>
        </div>
      </a>
      {props.activePage === 'main'
        ?
        <button className={props.loggedIn
          ? props.card.isSaved ? 'news-card__save-button news-card__save-button_saved' : 'news-card__save-button'
          : 'news-card__save-button news-card__save-button_not-logged'}
          type="button"
          aria-label="Сохранить карточку"
          onClick={handleSaveButtonClick}
        />
        :
        <>
          <button className="news-card__delete-button" type="button" aria-label="Удалить из сохранённых" onClick={handleDeleteButtonClick} />
          <p className="news-card__keyword">{props.card.keyword}</p>
        </>
      }
    </div>
  )
}

function formatDate(date) {
  let month;
  switch (date.slice(5, 7)) {
    case '01':
      month = ' января, ';
      break;
    case '02':
      month = ' февраля, ';
      break;
    case '03':
      month = ' марта, ';
      break;
    case '04':
      month = ' апреля, ';
      break;
    case '05':
      month = ' мая, ';
      break;
    case '06':
      month = ' июня, ';
      break;
    case '07':
      month = ' июня, ';
      break;
    case '08':
      month = ' августа, ';
      break;
    case '09':
      month = ' сентября, ';
      break;
    case '10':
      month = ' октября, ';
      break;
    case '11':
      month = ' ноября, ';
      break;
    case '12':
      month = ' декабря, ';
      break;
    default:
      month = '';
  }
  return +date.slice(8, 10) + month + date.slice(0, 4);
}

export default NewsCard;
