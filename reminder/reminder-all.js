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
  
  async function httpParser(https, type) {
      return new Promise((resolve, reject) => {
          options = 'https://standup-db-33e78.firebaseio.com/standup/' + type + '.json';
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
  
  async function _command(params, commandText, secrets = {}) {
    const {
      string
    } = params;
    
    let packages = [ 'https'];
    await install(packages);
    
    var https = require('https');
    // let url = 'https://standup-db-33e78.firebaseio.com/standup/standupID.json';
  
    let doneString = await httpParser(https, 'done');
    let todayString = await httpParser(https, 'today');
    let blockersString = await httpParser(https, 'blockers'); 
    
    return {
      response_type: 'in_channel', // or `ephemeral` for private response
      blocks: [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Done so Far:*" + doneString
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*In Progress Today:*" + todayString
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Blockers Present:*" + blockersString
			}
		}
	]
      // text: "All so far: " + doneString + todayString + blockersString
    };
  }
  
  /**
   * @typedef {object} SlackBodyType
   * @property {string} text
   * @property {'in_channel'|'ephemeral'} [response_type]
   */
  
  const main = async ({__secrets = {}, commandText, ...params}) => ({body: await _command(params, commandText, __secrets)});
  module.exports = main;
  