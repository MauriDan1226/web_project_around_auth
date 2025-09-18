class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    }).then((res) => res.json());
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers },
    }).then(this._handleServerResponse);
  }

  createCard(body) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    }).then(this._handleServerResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
      },
    }).then(this._handleServerResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleServerResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleServerResponse);
  }
  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b181b2c4-cbd7-419a-a6a7-e92df8c213c0",
    "Content-Type": "application/json",
  },
});

/*   getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  } */

export default Api;
