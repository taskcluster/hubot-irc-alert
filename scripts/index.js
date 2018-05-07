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
//   BUGZILLA_BLOCKER_PRODUCT - Optional
//   BUGZILLA_BLOCKER_TIME_PERIOD - Optional
//
// Commands:
//   None
//
// Notes:
//   None
//
// Author:
//   helfi92
const got = require('got');

const BUGZILLA_BASE_URL = 'https://bugzilla.mozilla.org';

module.exports = (robot) => {
  const alertFromRequest = (req) => {
    let alert = req.body.payload ? req.body.payload : req.body;

    if (typeof alert === 'string') {
      alert = JSON.parse(alert);
    }

    return alert;
  };

  const messageRooms = (message) => {
    const ircRooms = process.env.HUBOT_IRC_ROOMS;

    if (!ircRooms) {
      return;
    }

    const rooms = ircRooms.split(/,[\s]*/);

    rooms.forEach(room => robot.messageRoom(room, message));
  };

  // Notify HUBOT_IRC_ROOMS if someone files a blocker bug against BUGZILLA_BLOCKER_PRODUCT.
  // Inform periodically until someone either takes the bug to fix it or downgrades its severity.
  if (process.env.BUGZILLA_BLOCKER_PRODUCT) {
    setInterval(async () => {
      try {
        const { body: { bugs } } = await got.get(`${BUGZILLA_BASE_URL}/rest/bug`, {
          json: true,
          query: {
            product: process.env.BUGZILLA_BLOCKER_PRODUCT,
            bug_severity: 'blocker',
            resolution: '---',
            bug_status: ['NEW', 'REOPENED'],
            priority: ['--', 'P1', 'P2'],
          },
        });

        bugs.map(bug => messageRooms(`[Blocker] ${bug.summary} https://bugzilla.mozilla.org/show_bug.cgi?id=${bug.id}.`));
      } catch (err) {
        robot.logger.error(err);
      }
    }, process.env.BUGZILLA_BLOCKER_TIME_PERIOD || 5 * 60 * 1000);
  }

  robot.router.post('/hubot/sentry', (req, res) => {
    const data = alertFromRequest(req);
    const message = `[Sentry] ${data.project} ${data.project_name}: ${data.message} ${data.url}`;

    messageRooms(message);

    return res
      .status(200)
      .send(message);
  });

  robot.router.post('/hubot/signalfx', (req, res) => {
    const data = alertFromRequest(req);
    const message = `[Signal FX] ${data.rule}: ${data.description} ${data.detectorUrl}`;

    messageRooms(message);

    return res
      .status(200)
      .send(message);
  });

  robot.router.post('/hubot/papertrail', (req, res) => {
    const data = alertFromRequest(req);
    const message = `[Papertrail] ${data.saved_search.name}: ${data.saved_search.query} ${data.saved_search.html_search_url}`;

    messageRooms(message);

    return res
      .status(200)
      .send(message);
  });
};
