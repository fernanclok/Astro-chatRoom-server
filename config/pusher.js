const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1677121",
  key: "ef4097ac90f0658b875d",
  secret: "333e736f4cb1a6c521b0",
  cluster: "us3",
  useTLS: true
});

module.exports = pusher;