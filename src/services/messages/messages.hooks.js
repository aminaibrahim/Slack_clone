module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context) {
        context.app.io
          .in(context.data.to)
          .emit('message', context.data.content);
        context.app.io
          .to(context.data.from)
          .emit('message', context.data.content);
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
