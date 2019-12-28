const async = require('async');
const { exec } = require('child_process');

/**
 *
 * @param {*} listOfCommands
 */
module.exports = function(listOfCommands) {
  const seriesList = [];

  listOfCommands.forEach(function(buildScript) {
    seriesList.push(function(callback) {
      console.log(buildScript.description);
      if (buildScript.script) {
        exec(buildScript.script, (err, stdout, stderr) => {
          if (err || stderr) {
            console.log(err || stderr);
          }
          postScriptExec(buildScript, callback);
        });
      } else {
        postScriptExec(buildScript, callback);
      }
    });
  });

  async.series(seriesList);
};

/**
 *
 * @param {*} script
 * @param {*} callback
 */
function postScriptExec(script, callback) {
  if (script.name) {
    console.log(`Completed ${script.name}`);
  }
  console.log('--------------------------\n');
  if (callback) {
    callback();
  }
}
