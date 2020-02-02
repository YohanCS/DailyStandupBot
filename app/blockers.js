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
  
  async function oldString(https) {
      return new Promise((resolve, reject) => {
          options = 'https://standup-db-33e78.firebaseio.com/standup/blockers.json';
          const req = https.request(options, (res) => {
              res.setEncoding('utf8');
              let responseBody = '';
  
              res.on('data', (chunk) => {
                  responseBody += chunk;
              });
  
              res.on('end', () => {
                  resolve(JSON.parse(responseBody));
              });
          });
  
          req.on('error', (err) => {
              reject(err);
          });
  
          //req.write(data);
          req.end();
      });
  }
  
  async function httpParser(options, fetch, oldStr) {
      return new Promise((resolve, reject) => {
            var innerText = JSON.stringify(oldStr + "\n" + "•" + options);
          fetch("https://standup-db-33e78.firebaseio.com/standup/blockers.json", {
            body: innerText,
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
    
    let packages = [ 'node-fetch', 'https'];
    await install(packages);
    
    var https = require('https'); 
    var node_fetch = require('node-fetch');
    let oldStr = await oldString(https);
    httpParser(string, node_fetch, oldStr); 
    
    return {
      response_type: 'in_channel', // or `ephemeral` for private response
      text: "Text: changed successfully"
    };
  }
  
  /**
   * @typedef {object} SlackBodyType
   * @property {string} text
   * @property {'in_channel'|'ephemeral'} [response_type]
   */
  
  const main = async ({__secrets = {}, commandText, ...params}) => ({body: await _command(params, commandText, __secrets)});
  module.exports = main;
  