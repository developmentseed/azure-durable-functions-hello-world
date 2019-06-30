const rp = require('request-promise');

module.exports = async function(context, message) {
  context.log('Node.js queue trigger function processed work item', message);
  const outfilename = message.split('/').slice(-1);
  context.bindings.outfilename = outfilename;

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
  let body
  await rp.get(options)
    .then((res) => {
      context.log(`Got response ${res}`);
      body = res;
    })
    .catch((err) => {
      context.error(`Caught error ${res}`);
      return err;
    });

  return body;
};
