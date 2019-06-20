const { createClient } = require('webdav');
const azure = require('azure-storage');
const queueSvc = azure.createQueueService();

module.exports = async function (context) {
  const baseUrl = 'https://podaac-tools.jpl.nasa.gov/drive/files/allData/ghrsst/data/GDS2/L4/GLOB/JPL/MUR/v4.1/2002/340';
  const client = createClient(
    baseUrl, {
      username: 'aimeeb',
      password: process.env.WEBDAV_PASSWORD
    }
  );
   
  // Get directory contents
  const remoteFiles = await client.getDirectoryContents('/')
    .then((response) => {
      const filesToDownload = response.filter((x) => {
        return x.filename.match(/.+\.nc$/);
      });
      return filesToDownload.map(x => `${baseUrl}${x.filename}`);
    });

  return remoteFiles;
}
