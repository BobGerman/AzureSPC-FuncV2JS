// Even though Vittorio says "don't peek..."
// (see http://bit.ly/VittorioSaysDontPeek)
//
// he's referring to clients not peeking in
// access tokens, which are really none of their
// business. Access tokens' soul purpose is to relay
// information authorization info to the resource server!
//
// HOWEVER this is not a client token.
// This is an App Service specific header injected by
// Easy Auth, so it's OK to parse the token to get
// the user information inside.

module.exports = function getUsername (req) {

    let result = "unknown user";
    const callerTokenBase64 =
        req.headers['x-ms-client-principal'];

    if (callerTokenBase64) {
        const buff =
            Buffer.from(callerTokenBase64, 'base64');
        const callerTokenString =
            buff.toString('ascii');
        const callerTokenObject =
            JSON.parse(callerTokenString);

        for (let claim of callerTokenObject.claims) {
            if (claim.typ == "name") {
                    result = claim.val;
            }
        }
    }
    return result;

}