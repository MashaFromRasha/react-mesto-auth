export class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _makeRequest(path, method, body) {
    return fetch(this.baseUrl + path, {
      method: method || "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      ...body,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
  }

  getProfile() {
    return this._makeRequest("/users/me");
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id)
    } else {
      return this.deleteLike(id)
    }
  }

  editProfile(name, about) {
    return this._makeRequest("/users/me", "PATCH", {
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  deleteLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, "DELETE");
  }

  addLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, "PUT");
  }

  addCard(name, link) {
    return this._makeRequest("/cards", "POST", {
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._makeRequest(`/cards/${id}`, "DELETE");
  }

  resetAvatar(avatarPhoto) {
    return this._makeRequest("/users/me/avatar", "PATCH", {
      body: JSON.stringify({
        avatar: avatarPhoto,
      }),
    });
  }
}

const api = new Api({
  baseUrl: "https://api.murochkina.students.nomoredomains.xyz",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});

export default api;
