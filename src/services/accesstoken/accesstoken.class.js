const axios = require('axios');
const jwt = require('jsonwebtoken');

const insertIntoDb = (id, name, url, email) => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:3030/users', {
        id: id,
        name: name,
        picture: url,
        email: email
      })
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
};
/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://graph.facebook.com/me?fields=id,name,email,picture{url}&access_token=${
            params.query.token
          }`
        )
        .then(({ data }) => {
          const {
            id,
            name,
            email,
            picture: {
              data: { url }
            }
          } = data;
          insertIntoDb(id, name, url, email);
          const token = jwt.sign({ userId: id }, 'qwerty');
          return resolve(token);
        })
        .catch(error => reject(error));
    });
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
