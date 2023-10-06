class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  //Проверка ответа от сервера
  _checkResponse(res) {
    if (res.ok)
      return res.json();
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getInitialCards() { //GET
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }

  getUserInfo() { //GET
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }

  setUserInfo(data) { //PATCH
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  addNewCard(data) { //POST
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  }

  deleteMyCard(cardId) { //DELETE
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }

  setUserAvatar(avatar) { //PATCH //бывшая changeUserAvatar
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.mestoapp.nomoredomainsrocks.ru', // 'https://mesto.nomoreparties.co/v1/cohort-69',
  // headers: {
  //   authorization: 'db32af4e-65bc-4fee-86db-efd37a52aabf',
  //   'Content-Type': 'application/json'
  // }
})
export default api;