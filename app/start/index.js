const df = require("durable-functions");

module.exports = async function (context, req) {
  const client = df.getClient(context);
  const instanceId = await client.startNew('orchestrator', undefined, 'Nuget');

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return await client.createCheckStatusResponse(context.bindingData.req, instanceId);
};
