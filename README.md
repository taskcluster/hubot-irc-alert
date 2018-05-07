# hubot-irc-alert

A hubot interface to report errors/alerts from third party services. `hubot-irc-alert` currently understand:

* [Sentry](https://sentry.io/) 
* [Signal FX](https://signalfx.com/)
* [Papertrail](https://papertrailapp.com/)
* [Bugzilla](https://bugzilla.mozilla.org/)

## Configuration

The following environment variables are required:

* `HUBOT_IRC_SERVER`
* `HUBOT_IRC_ROOMS`
* `HUBOT_IRC_NICK`

And the following are optional:

* `BUGZILLA_BLOCKER_PRODUCT`
* `BUGZILLA_BLOCKER_INTERVAL`
* `HUBOT_IRC_PORT`
* `HUBOT_IRC_USERNAME`
* `HUBOT_IRC_PASSWORD`
* `HUBOT_IRC_NICKSERV_PASSWORD`
* `HUBOT_IRC_NICKSERV_USERNAME`
* `HUBOT_IRC_SERVER_FAKE_SSL`
* `HUBOT_IRC_SERVER_CERT_EXPIRED`
* `HUBOT_IRC_UNFLOOD`
* `HUBOT_IRC_DEBUG`
* `HUBOT_IRC_USESSL`
* `HUBOT_IRC_PRIVATE`
* `HUBOT_IRC_USESASL`

| Environment Variable | Description |
| -------------------- | ----------- |
| `BUGZILLA_BLOCKER_PRODUCT` | A Bugzilla product (e.g., Taskcluster). |
| `BUGZILLA_BLOCKER_INTERVAL` | The waiting interval (in milliseconds) before examining blocker bugs.

For more details on accepted environment variables, refer
to [hubot-irc#configuring-the-adapter](https://github.com/nandub/hubot-irc/blob/master/README.md#configuring-the-adapter).

The fastest way to get started local development is to update the `.env` file located in the root of the repo.
Add environment-specific variables on new lines in the form of `NAME=VALUE`.

_Example: Configuring for mozilla's taskcluster-bots IRC channel in the `.env` file_

```bash
BUGZILLA_BASE_URL="https://bugzilla.mozilla.org"
BUGZILLA_BLOCKER_INTERVAL=300000
HUBOT_IRC_SERVER="irc.mozilla.org"
HUBOT_IRC_ROOMS="#taskcluster-bots"
HUBOT_IRC_NICK="mrrobot"
HUBOT_IRC_UNFLOOD="true"
HUBOT_IRC_PORT=6667
```

## Webhooks Endpoints

To have alerts sent to you for a particular service, create a webhook for it. The creation is usually done
via the third party. `hubot-irc-alert` offers the following endpoints URLs:

| Name | Endpoint URL | 
| ---- | ----------- |
| `Sentry` | `<server-url>/hubot/sentry` |
| `Singal FX` | `<server-url>/hubot/signalfx` |
| `Papertrail` | `<server-url>/hubot/papertrail` |

## Bugzilla Blocker Bugs

If someone files a blocker bug against `BUGZILLA_BLOCKER_PRODUCT`, `hubot-irc-alert` will send periodic alerts until the bug is assigned or its severity is downgraded to P3 or below.

## Contributing

Thank you for wanting to help out with `hubot-irc-alert`! We are looking to integrate alerts for additional
third party services. Pull-requests are welcomed :)

## Service Owner

Service Owner: haali@mozilla.com
