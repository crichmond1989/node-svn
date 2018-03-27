var spawn = require('child_process').spawn;

module.exports = function (options, next) {
  var args = ["info"];

  options = options || {};

  if (options.remote) {
    args.push(options.remote);
  } else if (this.remote) {
    args.push(this.remote);
  }

  if (options.recursive)
    args.push("-R");

  if (options.revision) {
    args.push("-r");
    args.push(options.revision.toString());
  }

  var child = spawn('svn', args, {
    cwd: this.local
  });

  var stdout = '';
  var stderr = '';

  child.stdout.on('data', function (data) {
    stdout += data;
  });

  child.stderr.on('data', function (data) {
    stderr += data;
  });

  child.on('close', function (code) {
    if (code !== 0)
      return next(new Error(stderr));

    var out_lines;
    var extractor = /^(.*): (.*)$/;
    var result = {};
    var results = [];

    if (stdout.indexOf('\r\n') != -1) {
      out_lines = stdout.split('\r\n');
    } else {
      out_lines = stdout.split('\n');
    }

    out_lines.forEach(function (line) {
      var match = extractor.exec(line);

      if (!match)
        return;

      if (match[1] in result) {
        results.push(result);
        result = {};
      }

      result[match[1]] = match[2];
    });

    results.push(result);

    if (results.length > 1)
      return next(null, results);

    return next(null, result);
  });
};