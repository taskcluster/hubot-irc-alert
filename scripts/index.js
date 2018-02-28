// Description:
//   Report errors/alerts from third party services
//
// Dependencies:
//   None
//
// Configuration:
//   HUBOT_IRC_SERVER
//   HUBOT_IRC_ROOMS
//   HUBOT_IRC_NICK
//   HUBOT_IRC_PORT - Optional
//   HUBOT_IRC_USERNAME - Optional
//   HUBOT_IRC_PASSWORD - Optional
//   HUBOT_IRC_NICKSERV_PASSWORD - Optional
//   HUBOT_IRC_NICKSERV_USERNAME - Optional
//   HUBOT_IRC_SERVER_FAKE_SSL - Optional
//   HUBOT_IRC_SERVER_CERT_EXPIRED - Optional
//   HUBOT_IRC_UNFLOOD - Optional
//   HUBOT_IRC_DEBUG - Optional
//   HUBOT_IRC_USESSL - Optional
//   HUBOT_IRC_PRIVATE - Optional
//   HUBOT_IRC_USESASL - Optional
//
// Commands:
//   None
//
// Notes:
//   None
//
// Author:
//   helfi92
module.exports = function(robot) {
  const alertFromRequest = (req) => {
    let alert = req.body.payload ? req.body.payload : req.body;

    if (typeof alert === 'string') {
      alert = JSON.parse(alert);
    }

    return alert;
  };

  const messageRooms = (message) => {
    const ircRooms = process.env['HUBOT_IRC_ROOMS'];

    if (!ircRooms) {
      return;
    }

    const rooms = ircRooms.split(',[\s]*');

    rooms.forEach(room => robot.messageRoom(room, message));
  };

  robot.router.post('/hubot/sentry', function(req, res) {
    const data = alertFromRequest(req);
    const message = `[Sentry] Alert from ${data.project} ${data.project_name}\n` +
      `[Sentry] Culprit: ${data.culprit}\n` +
      `[Sentry] Level: ${data.level}\n` +
      `[Sentry] Message: ${data.message}\n` +
      `[Sentry] Link: ${data.url}`;

    messageRooms(message);

    return res.status(200).send(message);
  });

  robot.router.post('/hubot/signalfx', function(req, res) {
    const data = alertFromRequest(req);
    const message = `[Signal FX] Severity: ${data.severity}\n` +
      `[Signal FX] Rule: ${data.rule}\n` +
      `[Signal FX] Description: ${data.description}\n` +
      `[Signal FX] Link: ${data.detectorUrl}`;

    messageRooms(message);

    return res.status(200).send(message);
  });

  robot.router.post('/hubot/papertrail', function(req, res) {
    const data = alertFromRequest(req);
    const message = `[Papertrail] Name: ${data.saved_search.name}\n` +
    `[Papertrail] Query: ${data.saved_search.query}\n` +
    `[Papertrail] URL: ${data.saved_search.html_search_url}`;

    messageRooms(message);

    return res.status(200).send(message);
  });
};
