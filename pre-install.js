const runScripts = require('./run-scripts');

const listOfCommands = [
  {
    'description': 'Pre install scripts started',
  },
  {
    'name': 'Babel cli',
    'script': 'npm install -g babel-cli',
    'description': 'Installing Babel Cli',
  },
  {
    'name': 'ESLint',
    'script': 'npm install -g eslint',
    'description': 'Installing ESLinter',
  },
  {
    'description': 'Pre build scripts completed, continuing with package.json installation.',
    'isEnd': true,
  },
];

runScripts(listOfCommands);
