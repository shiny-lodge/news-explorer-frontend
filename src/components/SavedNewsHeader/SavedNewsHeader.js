import React from 'react';

import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__title">Сохранённые статьи</p>
      <p className="saved-news-header__quantity">{currentUser.name}, у вас {props.savedNews.length} {getSavedArticlesText(props.savedNews.length)}</p>
      {props.sortedKeywords.length <= 3
        ?
        <p className="saved-news-header__keywords">
          По ключевым словам:
          {
            props.sortedKeywords.map((keyword, i) => {
              return i < props.sortedKeywords.length - 1
                ? <span key={i} className="saved-news-header__keyword"> {keyword},</span>
                : <span key={i} className="saved-news-header__keyword"> {keyword}</span>
            })
          }
        </p>
        :
        <p className="saved-news-header__keywords">
          По ключевым словам:
          {
            props.sortedKeywords.map((keyword, i) => {
              if (i === 0) {
                return <span key={i} className="saved-news-header__keyword"> {keyword},</span>
              } else if (i === 1) {
                return <span key={i} className="saved-news-header__keyword"> {keyword} </span>
              }
            })
          }
          и {props.sortedKeywords.length - 2}{getKeywordsText(props.sortedKeywords.length - 2)}
        </p>
      }
    </section>
  )
}

function getSavedArticlesText(number) {
  let text = 'сохранённых статей';
  if (number.toString().endsWith('1') && !number.toString().endsWith('11')) {
    text = 'сохранённая статья';
  } else if (number.toString().endsWith('2') && !number.toString().endsWith('12')) {
    text = 'сохранённые статьи';
  } else if (number.toString().endsWith('3') && !number.toString().endsWith('13')) {
    text = 'сохранённые статьи';
  } else if (number.toString().endsWith('4') && !number.toString().endsWith('14')) {
    text = 'сохранённые статьи';
  }
  return text;
}

function getKeywordsText(number) {
  let text = '-и другим';
  if (number.toString().endsWith('1') && !number.toString().endsWith('11')) {
    text = '-му другому';
  } else if (number.toString().endsWith('2') && !number.toString().endsWith('12')) {
    text = '-м другим';
  } else if (number.toString().endsWith('3') && !number.toString().endsWith('13')) {
    text = '-м другим';
  } else if (number.toString().endsWith('4') && !number.toString().endsWith('14')) {
    text = '-м другим';
  }
  return text;
}

export default SavedNewsHeader;
