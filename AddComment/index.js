getListId = require('./getListId');
postComment = require('./postComment');
getUsername = require('./getUsername');
getSentiment = require ('./getSentiment');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let token = context.bindings.graphToken;
    let username = getUsername(req);
    let comment = "";

    if (req.body &&
        req.body.siteId &&
        req.body.comment) {

        comment = req.body.comment;

        getSentiment(context, comment)
            .then((sentiment) => {
                comment = `${comment} (${sentiment})`;
                return getListId(context, token, req.body.siteId);
            })
            .then((listId) => {

                context.log('Got list ID' + listId);
                return postComment(token,
                    req.body.siteId,
                    listId,
                    comment);

            })
            .then(resp => {

                context.log('Successfully posted');
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: {
                        message: `POSTED on behalf of ${username}`
                    }
                };
                context.done();

            })
            .catch(error => {

                // Error encountered - return failure
                context.log(`Error encountered ${error}`);
                context.res = {
                    status: 400,
                    body: {
                        "message": "ERROR: " + error
                    }
                };
                context.done();

            });

    } else {
        context.res = {

            status: 400,
            body: "Please pass a site ID and comment on the query string or in the request body"
            
        };
    }
};