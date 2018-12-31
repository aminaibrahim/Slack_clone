/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const cookieParser = require('socket.io-cookie');
const jwt = require('jsonwebtoken');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port
  )
);
app.io.use(cookieParser);
app.io.on('connection', client => {
  if (client.handshake.headers.cookie.token) {
    try {
      const verification = jwt.verify(
        client.handshake.headers.cookie.token,
        'qwerty'
      );

      const id = verification.userId;

      client.join('all'); // joining to 'all channel
      client.join(id); // joining to their own channel

      // users = onlineUsers.filter((item, pos) => {
      //   return onlineUsers.indexOf(item) == pos;
      // });

      //listening to msg from client

      // client.on('chat', msg => {
      //   app.io.to(id).emit('chat', msg);
      // });

      //
      app.io.in(id).clients((err, clients) => {
        if (clients.length === 1)
          app.io.to('all').emit('userIsOnline', { userId: id });
      });

      client.on('disconnect', () => {
        app.io.in(id).clients((err, clients) => {
          if (clients.length === 0) {
            client.leave(id);
            app.io.to('all').emit('userIsOffline', { userId: id });
          }
        });
      });
    } catch (err) {
      console.log('cookie is not found');
    }
  }
});
