import React from 'react';

import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews(props) {
  React.useEffect(() => {
    props.setSavedNewsPageActive();
  })

  return (
    <>
      {
        props.savedNews.length > 0
          ?
          <>
            <SavedNewsHeader savedNews={props.savedNews} />
            <NewsCardList savedNews={props.savedNews} />
          </>
          :
          <p>Пока нет сохранённых статей</p>
      }
    </>
  )
}

export default SavedNews;
