const axios = require('axios');
const jwt = require('jsonwebtoken');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const id = jwt.verify(params.query.cookie, 'qwerty').userId;
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3030/users/${id}`)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          reject(error);
        });
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
