// Description:
//   Accept incoming Webhooks to write messages to a room/channel
//
// Configuration:
//   WEBHOOK_TOKEN: A string for building your secret webhook URL
//
// Authors:
//   Sebastian Kippe <sebastian@kip.pe>

(function () {
  "use strict";

  module.exports = function(robot) {

    robot.router.post('/incoming/'+process.env.WEBHOOK_TOKEN, function(req, res) {
      var data    = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
      var room    = data.room;
      var message = data.message;

      if (typeof room !== 'string' || typeof message === 'undefined') {
        res.send(422); return;
      }

      if (typeof message === 'string') {
        robot.messageRoom(room, message);
      } else if (message instanceof Array) {
        message.forEach(function(line) {
          return robot.messageRoom(room, line);
        });
      };

      res.send(200);
    });

  };
}());
