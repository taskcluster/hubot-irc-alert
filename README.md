# hubot-irc-alert

A hubot interface to report errors/alerts from third party services. `hubot-irc-alert` currently understand:

* [Sentry](https://sentry.io/) 
* [Signal FX](https://signalfx.com/)
* [Papertrail](https://papertrailapp.com/)

## Configuration

The IRC adapter requires the following environment variables:

* `HUBOT_IRC_SERVER`
* `HUBOT_IRC_ROOMS`
* `HUBOT_IRC_NICK`

And the following are optional:

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

For more details on accepted environment variables, refer
to [hubot-irc#configuring-the-adapter](https://github.com/nandub/hubot-irc/blob/master/README.md#configuring-the-adapter).

_Example: Configuring for mozilla's taskcluster-bots IRC channel_

```bash
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
 

## Contributing

Thank you for wanting to help out with `hubot-irc-alert`! We are looking to integrate alerts for additional
third party services. Pull-requests are welcomed :)


## Service Owner

Service Owner: haali@mozilla.com
