import React from 'react';

import './About.css';
import avatar from '../../images/avatar.jpg';

function About(props) {
  return (
    <section className="about">
      <img className="about__avatar" src={avatar} alt="Моё фото" />
      <div className="about__container">
        <p className="about__subtitle">Об авторе</p>
        <p className="about__paragraph">
          Эту страницу сколотил из реакта и других подручных инструментов в рамках обучения на платформе Яндекс.Практикум Даниил Ломовицкий, переводчик, редактор, преподаватель, музыкант, швец, жнец, на дуде игрец и начинающий веб-разработчик.
        </p>
        <p className="about__paragraph">
          Только посмотрите какая страница вышла, просто сказка. Здесь и регистрация, и авторизация, и новости сохранить можно. Всё это стало возможно благодаря Практикуму, где я с нуля научился фронтенд- и бэкенд-разработке. Поиск новостей происходит через News API, всё остальное своё.
        </p>
        <p className="about__paragraph">
          Домашнее.
        </p>
      </div>
    </section>
  )
}

export default About;
