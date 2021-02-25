import React from 'react';

import './Preloader.css';

function Preloader(props) {
  return (
    <section className="preloader">
      <i className="preloader__circle" />
      <p className="preloader__text">Идёт поиск новостей...</p>
    </section>
  )
}

export default Preloader;
