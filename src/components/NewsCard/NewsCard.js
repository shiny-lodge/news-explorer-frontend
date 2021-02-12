import React from 'react';

import './NewsCard.css';

function NewsCard(props) {
  return (
    <div className="news-card">
      <a className="news-card__link" href={props.card.source.url} target="_blank" rel="noopener noreferrer">
        <img className="news-card__image" src={props.card.urlToImage} alt="Картинка к новости." />
        <div className="news-card__container">
          <p className="news-card__date">{props.card.publishedAt}</p>
          <div className="news-card__text-wrapper">
            <p className="news-card__title">{props.card.title}</p>
            <p className="news-card__description">{props.card.description}</p>
          </div>
          <p className="news-card__source">{props.card.source.name}</p>
        </div>
      </a>
      {props.activePage === 'main'
        ?
        <button className={props.loggedIn ? 'news-card__save-button' : 'news-card__save-button news-card__save-button_not-logged'}
          type="button"
          aria-label="Сохранить карточку"
        />
        :
        <>
          <button className="news-card__delete-button" type="button" aria-label="Удалить из сохранённых" />
          <p className="news-card__keyword">{props.card.keyword}</p>
        </>
      }
    </div>
  )
}

export default NewsCard;
