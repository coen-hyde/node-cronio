var http = require('http');
var querystring = require('querystring');

module.exports = function (options) {
  options = _.extend({
    api_version: 'v1'
  }, options || {});

  function _request(method, path, auth, data, cb) {
    path = '/' + options.api_version + '/' + path
    var request_data = JSON.stringify(data || {});

    var request_options = {
      host: 'api.cron.io',
      port: '80',
      path: path,
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': request_data.length
      }
    };

    if (auth) {
      request_options.headers['Authorization'] = 'Basic ' + new Buffer(options.username + ":" + options.password).toString('base64');
    }

     var req = http.request(request_options);
  }

  function get(path, auth, cb) {
      _request('GET', path, auth, {}, cb);
  }

  function put(path, auth, data, cb) {
      _request('PUT', path, auth, data, cb);
  }

  function post(path, auth, data, cb) {
      _request('POST', path, auth, data, cb);
  }

  function del(path, auth, cb) {
      _request('DELETE', path, auth, {}, cb);
  }

  return {
    users: {
      create: function (data, cb) {
        post("users", false, data, cb);
      }
    },
    crons: {
      list: function (cb) {
        return get("crons", true, cb);
      },
      create: function (data, cb) {
        return post("crons", true, data, cb);
      },
      get: function (cron_id, cb) {
        if (!(cron_id && typeof cron_id === 'string')) {
            cb("cron_id required");
        }

        return get("crons/"+cron_id, true, cb);
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

        return del("crons/"+cron_id, true, cb);
      }
    }
  }
}