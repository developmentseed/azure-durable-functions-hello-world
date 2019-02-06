module.exports = async function (context) {
  context.log('Processing request');
  context.res = {
    status: 400,
    body: 'You have made a very simple request'
  }
};
