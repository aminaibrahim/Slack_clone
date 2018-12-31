const assert = require('assert');
const app = require('../../src/app');

describe('\'currentuser\' service', () => {
  it('registered the service', () => {
    const service = app.service('currentuser');

    assert.ok(service, 'Registered the service');
  });
});
