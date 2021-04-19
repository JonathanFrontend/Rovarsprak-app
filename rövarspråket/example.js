function PostCode(codestring) {
    return new Promise((resolve, reject) => {
      // Build the post string from an object
      var post_data = querystring.stringify({
        'compilation_level': 'ADVANCED_OPTIMIZATIONS',
        'output_format': 'json',
        'output_info': 'compiled_code',
        'warning_level': 'QUIET',
        'js_code': codestring
      });
  
      // An object of options to indicate where to post to
      var post_options = {
        host: 'closure-compiler.appspot.com',
        port: '80',
        path: '/compile',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
        }
      };
  
      //Store chunks
      var response = "";
      // Set up the request
      var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          response += chunk;
          console.log('Response: ' + chunk);
        });
        res.on('end', function() {
          //resolve on end event
          resolve(response);
        });
        res.on('error', function(error) {
          //reject on error event
          reject(error);
        });
      });
  
      // post the data
      post_req.write(post_data);
      post_req.end();
    });
  }