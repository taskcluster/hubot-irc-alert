const got = require('got');

module.exports = async (query) => {
  const { body: { bugs } } = await got.get(`${process.env.BUGZILLA_BASE_URL}/rest/bug`, {
    json: true,
    query,
  });

  return bugs;
};
