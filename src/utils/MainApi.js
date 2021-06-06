import { BASE_URL, SERVER_ERROR_MESSAGE } from './config';

export function register(email, password, name) {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return response;
      } else if (response.statusCode === 400 && response.validation) {
        return response.validation.body;
      } else if (response.message) {
        return response;
      }
    })
    .catch(error => {
      return {
        message: SERVER_ERROR_MESSAGE
      }
    });
};

export function login(email, password) {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then((response => response.json()))
    .then(response => {
      if (response.data) {
        return response;
      } else if (response.statusCode === 400 && response.validation) {
        return response.validation.body;
      } else if (response.message) {
        return response;
      }
    })
    .catch(error => {
      return {
        message: SERVER_ERROR_MESSAGE
      }
    })
};

export function checkAuth() {
  return fetch(BASE_URL + '/users/me', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(response => response)
    .catch(error => {
      return {
        message: SERVER_ERROR_MESSAGE
      }
    })
}

export function createArticle(keyword, title, text, date, source, link, image) {
  return fetch(BASE_URL + '/articles', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ keyword, title, text, date, source, link, image })
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return response;
      } else if (response.statusCode === 400 && response.validation) {
        return response.validation.body;
      } else if (response.message) {
        return response;
      }
    })
    .catch(error => {
      return {
        message: SERVER_ERROR_MESSAGE
      }
    });
};

export function deleteArticle(id) {
  return fetch(BASE_URL + '/articles/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return response;
      } else if (response.statusCode === 400 && response.validation) {
        return response.validation.body;
      } else if (response.message) {
        return response;
      }
    })
    .catch(error => {
      return {
        message: SERVER_ERROR_MESSAGE
      }
    });
};

export function getArticles() {
  return fetch(BASE_URL + '/articles', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return response;
      } else if (response.statusCode === 400 && response.validation) {
        return response.validation.body;
      } else if (response.message) {
        return response;
      }
    })
    .catch(error => {
      return {
        message: SERVER_ERROR_MESSAGE
      }
    });
};
