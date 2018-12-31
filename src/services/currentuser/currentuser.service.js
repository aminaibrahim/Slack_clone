// Initializes the `currentuser` service on path `/currentuser`
const createService = require('./currentuser.class.js');
const hooks = require('./currentuser.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/currentuser', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('currentuser');

  service.hooks(hooks);
};
