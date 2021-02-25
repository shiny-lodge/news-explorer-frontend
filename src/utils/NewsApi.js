import { API_KEY } from './config';

export function searchNews(query) {
  const date = new Date();
  const currentDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
    + '-' + date.getDate().toString().padStart(2, '0');
  date.setDate(date.getDate() - 7);
  const startingDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
    + '-' + date.getDate().toString().padStart(2, '0');
  const url = 'https://nomoreparties.co/news/v2/everything?'
    + `q=${query}&`
    + `apiKey=${API_KEY}&`
    + `from=${startingDate}&`
    + `to=${currentDate}&`
    + 'sortBy=publishedAt&'
    + `pageSize=100`;

  return fetch(url, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);
}
