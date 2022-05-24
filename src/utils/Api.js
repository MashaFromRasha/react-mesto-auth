class Api {

    constructor({ baseUrl, groupId, headers }) {
        this._address = baseUrl;
        this._groupId = groupId;
        this._headers = headers;
    }


    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }


    getUserInfo() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }


    setUserInfo(data) {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then(this._checkResponse);
    }


    getCards() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getCards()]);
    }


    addCard(data) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse);
    }


    removeCard(id) {
        return fetch(`${this._address}/${this._groupId}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }


    addLike(id) {
        return fetch(`${this._address}/${this._groupId}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }


    removeLike(id) {
        return fetch(`${this._address}/${this._groupId}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }


    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
          return this.removeLike(id);
        } else {
          return this.addLike(id);
        }
    }

    setUserAvatar(data) {
        return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkResponse);
    }
}

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    groupId: 'cohort-39',
    headers: {
        authorization: '65df588a-f3b5-4198-8939-b069c90bb6b0',
        'Content-Type': 'application/json'
    }
};

const api = new Api(config);

export default api;