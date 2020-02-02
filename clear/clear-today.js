// jshint esversion: 9

/**
 * @description null
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */

async function install(pkgs) {
    pkgs = pkgs.join(' ');
    return new Promise((resolve, reject) => {
      const { exec } = require('child_process');
      exec(`npm install ${pkgs}`, (err, stdout, stderr) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  

  async function httpParser(fetch) {
      return new Promise((resolve, reject) => {
          fetch("https://standup-db-33e78.firebaseio.com/standup/today.json", {
            body: JSON.stringify(""),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "PUT"
          });
      });
  }
  
  async function _command(params, commandText, secrets = {}) {
    const {
      string
    } = params;
    
    let packages = [ 'node-fetch'];
    await install(packages);
    
    var node_fetch = require('node-fetch');
    httpParser(node_fetch); 
    
    return {
      response_type: 'in_channel', // or `ephemeral` for private response
      text: "Cleared successfully"
    };
  }
  
  /**
   * @typedef {object} SlackBodyType
   * @property {string} text
   * @property {'in_channel'|'ephemeral'} [response_type]
   */
  
  const main = async ({__secrets = {}, commandText, ...params}) => ({body: await _command(params, commandText, __secrets)});
  module.exports = main;
  