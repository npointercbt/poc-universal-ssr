const serverless = require("serverless-http");
const express = require("express");
const clientStats = require("./clientStats.json");
const serverRender = require("./buildServer/main.js").default;

const app = express();

console.log(__dirname + "/buildClient");

app.use(express.static(__dirname + "/buildClient"));
app.use(serverRender({ clientStats }));

// app.listen(3000, () => {
//   console.log('Listening @ http://localhost:3000')
// })

module.exports.handler = serverless(app);
