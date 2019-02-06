const df = require("durable-functions");

module.exports = df.orchestrator(function*(context){
  context.log("Starting chain sample");
  const output = [];
  output.push(yield context.df.callActivity("say_hello", "Tokyo"));
  output.push(yield context.df.callActivity("say_hello", "Seattle"));
  output.push(yield context.df.callActivity("say_hello", "London"));

  return output;
});
