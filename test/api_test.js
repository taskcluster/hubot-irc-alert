const Helper = require('hubot-test-helper');
const assert = require('assert');
const got = require('got');
const { join } = require('path');
const blockers = require('../src/utils/blockers');

const helper = new Helper(
  join(__dirname, '..', 'src', 'scripts', 'index.js')
);

const baseUrl = 'http://localhost:8080';
let room;

describe('Array', function() {
  beforeEach(function() {
    room = helper.createRoom();
  });

  afterEach(function() {
    room.destroy();
  });

  describe('hubot', () => {
    it('should send a message to a room', async () => {
      const message = ['user', 'hi'];

      await room.user.say(message[0], message[1]);

      assert(room.messages[0][0] === message[0]);
      assert(room.messages[0][1] === message[1]);
    });
  });

  describe('webhooks', () => {
    const headers = {'content-type': 'application/json'};

    it('should show a sentry alert', async () => {
      const message = {
        project: 'project',
        project_name: 'project name',
        culprit: 'culprit',
        level: 'level',
        message: 'message',
        url: 'url',
      };

      const response = await got.post(`${baseUrl}/hubot/sentry`, {
        headers,
        body: JSON.stringify(message),
      });

      assert(response.body.includes('[Sentry]'));
    });

    it('should show a signal fx alert', async () => {
      const message = {
        severity: 'severity',
        rule: 'rule',
        description: 'description',
        detectorUrl: 'detectorUrl',
      };

      const response = await got.post(`${baseUrl}/hubot/signalfx`, {
        headers,
        body: JSON.stringify(message),
      });

      assert(response.body.includes('[Signal FX]'));
    });

    it('should show a papertrail alert', async () => {
      const message = {
        payload: {
          saved_search: {
            name: 'name',
            query: 'query',
            html_search_url: 'html_search_url',
          },
        },
      };

      const response = await got.post(`${baseUrl}/hubot/papertrail`, {
        headers,
        body: JSON.stringify(message),
      });

      assert(response.body.includes('[Papertrail]'));
    });
  });

  describe('bugzilla', () => {
    it('should find fixed blocker bugs', async () => {
      const bugs = await blockers({
        product: 'Taskcluster',
        bug_severity: 'blocker',
        bug_status: 'FIXED',
        priority: 'P1',
      });

      assert(bugs.length > 0);
    });
  });
});
