const runScripts = require("./run-scripts");

const listOfCommands = [
  {
    "description": "Pre install scripts started",
  }, {
    "description": "Installing Typescript",
    "name": "Typescript",
    "script": "npm install -g typescript",
  }, {
    "description": "Installing TS Node",
    "name": "TSNode",
    "script": "npm install -g ts-node-dev",
  }, {
    "description": "Installing TSLint",
    "name": "TSLint",
    "script": "npm install -g typescript",
  }, {
    "description": "Pre build scripts completed, continuing with package.json installation.",
    "isEnd": true,
  },
];

runScripts(listOfCommands);
