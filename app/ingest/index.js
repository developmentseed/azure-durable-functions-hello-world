module.exports = function(context, message) {
  context.log('Node.js queue trigger function processed work item', message);
  // OR access using context.bindings.<name>
  // context.log('Node.js queue trigger function processed work item', context.bindings.myQueueItem);  
  context.bindings.myOutputBlob = message;
  context.done();
};
