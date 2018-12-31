const assert = require('assert');
const app = require('../../src/app');

describe('\'accesstoken\' service', () => {
  it('registered the service', () => {
    const service = app.service('accesstoken');

    assert.ok(service, 'Registered the service');
  });
});
