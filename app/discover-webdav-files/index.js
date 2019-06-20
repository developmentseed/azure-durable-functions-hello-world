const request = require('request');

module.exports = function(context, message) {
  context.log('Node.js queue trigger function processed work item');
  context.log(JSON.stringify(message, null, 2));
  // OR access using context.bindings.<name>
  // context.log('Node.js queue trigger function processed work item', context.bindings.myQueueItem);
  const options = {
    url: message,
    auth: {
      'user': 'aimeeb',
      'pass': process.env.WEBDAV_PASSWORD
    }
  };
  
  context.log('Starting request');
  return request.get(options, function (error, response, body) {
    context.log('statusCode:', response && response.statusCode);
    if (err) {
      context.error('error:', error); // Print the error if one occurred
      return err;
    };
    context.bindings.myOutputBlob = body;
    context.done();
  });
};
