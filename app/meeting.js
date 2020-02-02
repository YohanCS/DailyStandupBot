// jshint esversion: 9

/**
 * @description null
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */
async function _command(params, commandText, secrets = {}) {
    const {
      location
    } = params;
  
    return {
      response_type: 'in_channel', // or `ephemeral` for private response
      "blocks": [
            {
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": "HackSC",
                    "emoji": true
                },
                "image_url": "https://i.imgur.com/IHi1ZhT.png",
                "alt_text": "HackSC"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Meeting* in " + location
                }
            }
        ]
        }
  }
  
  /**
   * @typedef {object} SlackBodyType
   * @property {string} text
   * @property {'in_channel'|'ephemeral'} [response_type]
   */
  
  const main = async ({__secrets = {}, commandText, ...params}) => ({body: await _command(params, commandText, __secrets)});
  module.exports = main;
  