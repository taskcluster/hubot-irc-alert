const got = require('got');

module.exports = async (query) => {
  const { body: { bugs } } = await got.get(`${process.env.BUGZILLA_BASE_URL}/rest/bug`, {
    headers: {
      'user-agent': 'hubot-irc-alert (https://github.com/taskcluster/hubot-irc-alert)'
    },
    json: true,
    query,
  });

  return bugs;
};
