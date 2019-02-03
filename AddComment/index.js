module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let token = null;
    let sentiment = "unknown";

    if (req.body && 
        req.body.siteId &&
        req.body.comment) {

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Hello " + req.body.siteId + ': ' + req.body.comment
            };
         
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a site ID and comment on the query string or in the request body"
        };
    }
};