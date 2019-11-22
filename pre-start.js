const runScripts = require('./run-scripts');

const listOfCommands = [
  {
    'description': 'Pre build scripts started',
  },
  { 'name': 'Babel Build',
    'script': 'babel --presets es2015 -d build/ app/**/*.js',
    'description': 'Building Project files to ./build folder',
  },
  {
    'name': 'ESLint Check',
    'script': 'eslint app/**/*.js --fix',
    'description': 'Fixing linting errors',
  },
  {
    'description': 'Pre build scripts completed, continuing with package.json installation.',
  },
];

runScripts(listOfCommands);

