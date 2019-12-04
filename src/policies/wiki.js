const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  edit() {
    return this.new();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update() &&
      this.record && (this._isOwner() || this._isAdmin() || this._isPremium());
  }
}