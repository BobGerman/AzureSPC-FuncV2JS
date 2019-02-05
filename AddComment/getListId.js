var request = require('request');
var settings = require('./settings');

// getListId() - Return promise of list ID for the comments
// list
module.exports = function getListId(context, token, siteId) {

    context.log('Getting list ID for ' + settings().LISTNAME);

    return new Promise((resolve, reject) => {

        const url = 'https://graph.microsoft.com/beta/sites/' +
            siteId + '/lists';

        try {

            // There's no way to query the ID of just one list using
            // Graph API. Therefore, get all the lists in this site
            request.get(url, {
                'auth': {
                    'bearer': token
                }
            }, (error, response, body) => {

                context.log('Received response ' + response.statusCode);

                if (!error && response && response.statusCode == 200) {

                    // If here we have all the lists
                    const result = JSON.parse(response.body);
                    // Find the comments list in the array of lists
                    const list = result.value.find((item) => {
                        return item.name == settings().LISTNAME;
                    });
                    // If we found it, resolve the promise, else reject
                    if (list) {
                        resolve(list.id);
                    } else {
                        reject("List not found");
                    }
                } else {
                    // If here we failed to get the token. Return local error
                    // message or message in response body
                    if (error) {
                        context.log('Received error ' + error);
                        reject(error);
                    } else {
                        let b = JSON.parse(response.body);
                        context.log('Received error ' + error);

                        reject(`${b.error.code} - ${b.error.message} - ${token}`);
                    }
                }

            });

            context.log('Requested ' + url);

        }
        catch (ex) {
            context.log('Error ' + ex);
        }

    });
}