module.exports = class Token {
  constructor({
    token,
    team_id,
    team_domain,
    channel_id,
    channel_name,
    user_id,
    user_name,
    command,
    text,
    response_url,
    trigger_id
  }) {
    this._token = token;
    this._team_id = team_id;
    this._team_domain = team_domain;
    this._channel_id = channel_id;
    this._channel_name = channel_name;
    this._user_id = user_id;
    this._user_name = user_name;
    this._command = command;
    this._text = text;
    this._response_url = response_url;
    this._trigger_id = trigger_id;
  }

  get text () {
    return this._text
  }
}