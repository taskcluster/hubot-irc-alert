const got = require('got');
const client = got.extend({
  headers: {
    'user-agent': 'hubot-irc-alert (https://github.com/taskcluster/hubot-irc-alert)'
  }
});

module.exports = async (query) => {
  const { body: { bugs } } = await client.get(`${process.env.BUGZILLA_BASE_URL}/rest/bug`, {
    json: true,
    query,
  });

  return bugs;
};
