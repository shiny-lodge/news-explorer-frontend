import React from 'react';

import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__title">Сохранённые статьи</p>
      <p className="saved-news-header__quantity">Жак, у вас 5 сохранённых статей</p>
      <p className="saved-news-header__keywords">
        По ключевым словам: <span className="saved-news-header__keyword">Наука</span>, <span className="saved-news-header__keyword">Искусство</span> и <span className="saved-news-header__keyword">2-м другим</span>
      </p>
    </section>
  )
}

export default SavedNewsHeader;
