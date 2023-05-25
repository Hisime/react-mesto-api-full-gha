export class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, {...options, credentials: "include"}).then(this._checkResponse)
    }

    getCards() {
        return this._request(`${this.baseUrl}/cards`, {
            headers: this.headers,
        });
    }

    getUserInfo() {
        return this._request(`${this.baseUrl}/users/me`, {
            headers: this.headers
        });
    }


    editProfile({name, about}) {
        return this._request(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({name, about})
        });
    }

    addCard({name, link}) {
        return this._request(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({name, link})
        });
    }

    deleteCard(id) {
        return this._request(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        });
    }

    changeLikeCardStatus(id, isLiked) {
        return this._request(`${this.baseUrl}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this.headers,
        });
    }

    changeAvatar(avatar) {
        return this._request(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar)
        });
    }
}

export default new Api({
    baseUrl: 'https://api.hisime.mesto.nomoredomains.monster',
    headers: {
        'Content-Type': 'application/json',
    },
});
