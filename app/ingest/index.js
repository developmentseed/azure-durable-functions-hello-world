const rp = require('request-promise');
const storage = require('azure-storage');

const blobService = storage.createBlobService();

const uploadString = async (containerName, blobName, text) => {
  return new Promise((resolve, reject) => {
    blobService.createBlockBlobFromText(containerName, blobName, text, err => {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: `Text "${text}" is written to blob storage`
        });
      }
    });
  });
};

module.exports = async function(context, message) {
  context.log('Node.js queue trigger function processed work item', message);
  const outfilename = message.split('/').slice(-1)[0];

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
      console.error(`Caught error ${res}`);
      return err;
    });

  const uploadResult = await uploadString('cumulus-blobs', outfilename, body);
  context.log(`Upload Result ${uploadResult}`);
  return uploadResult;
};
