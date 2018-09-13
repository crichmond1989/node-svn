var path = require('path');

var SVN = module.exports = function SVN(local, remote) {
  this.local = path.resolve(local);
  this.remote = remote;
}

SVN.prototype.get_remote = function get_remote(next) {
  var parse_info = require('./parse_info.js');
  parse_info(this.local, function (err, result) {
    if (err) return next(err);
    next(null, result['Repository Root']);
  })
}

SVN.prototype.info = require("./parse_info.js");

SVN.prototype.externals = require('./externals.js');

SVN.prototype.log = require('./commands/log.js');