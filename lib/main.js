module.exports = function (options) {
  var defaults = {
    api_version: 'v1'
  }

  options = _.defaults.extend(defaults, options || {});

  var request_options = {
    host: 'api.cron.io',
    port: '80',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  var auth = 'Basic ' + new Buffer(options.username + ":" + options.password).toString('base64');


  function get(path, auth, data, cb) {
      _request('GET', path, auth, data, cb);
  }

  function put(path, auth, data, cb) {
      _request('PUT', path, auth, data, cb);
  }

  function post(path, auth, data, cb) {
      _request('POST', path, auth, data, cb);
  }

  function del(path, auth, data, cb) {
      _request('DELETE', path, auth, data, cb);
  }

  return {
    users: {
      create: function (data, cb) {
        post("users", false, data, cb);
      }
    },
    crons: {
      list: function (cb) {
        return get("crons", true, {}, cb);
      },
      create: function (data, cb) {
        return post("crons", true, data, cb);
      },
      get: function (cron_id, cb) {
        if (!(cron_id && typeof cron_id === 'string')) {
            cb("cron_id required");
        }

        return get("crons/"+cron_id, true, {}, cb);
      },
      update: function (cron_id, data, cb) {
        if (!(cron_id && typeof cron_id === 'string')) {
          cb("cron_id required");
        }

        return put("crons/"+cron_id, true, data, cb);
      },
      del: function (cron_id, cb) {
         if (!(cron_id && typeof cron_id === 'string')) {
          cb("cron_id required");
        }

        return del("crons/"+cron_id, true, {}, cb);
      }
    }
  }
}