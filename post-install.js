const runScripts = require('./run-scripts');

const listOfCommands = [
  {
    'description': 'NPM Install completed, use npm start to start the project',
    'isEnd': true,
  },
];

runScripts(listOfCommands);
