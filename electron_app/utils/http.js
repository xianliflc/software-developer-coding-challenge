var http = require('http');

module.exports = {
    http_get: function (url, callback) {
        http.get(url, function(res) {
          const contentType = res.headers['content-type'];
          var error;
          if (res.statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                              `Status Code: ${statusCode}`);
          } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                              `Expected application/json but received ${contentType}`);
          }
          if (error) {
            console.error(error.message);
            // consume response data to free up memory
            res.resume();
            return;
          }
      
          res.setEncoding('utf8');
          var rawData = '';
          res.on('data', function(chunk){ rawData += chunk; });
          res.on('end', function(){
            try {
              callback(JSON.parse(rawData));
            } catch (e) {
              console.error(e.message);
            }
          });
        });
    },
      
    http_post: function (url, data, callback) {
        const postData = JSON.stringify(data);
        
        const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/api' + url,
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        const req = http.request(options, function(res) {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            var rawData = '';
            res.on('data', function(chunk) {
            rawData += chunk;
            });
            res.on('end', function() {
            try {
                callback(JSON.parse(rawData));
            } catch (e) {
                console.error(e.message);
            }
            });
        });
        
        req.on('error', function(e) {
            console.error(`problem with request: ${e.message}`);
        });
        
        // write data to request body
        req.write(postData);
        req.end();
    }
}
