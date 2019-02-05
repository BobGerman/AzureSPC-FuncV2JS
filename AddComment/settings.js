module.exports = () => {
    var settings = settings ? settings :
        {
            LISTNAME: "Comments",
            TEXT_ANALYTICS_URL: process.env["TEXT_ANALYTICS_URL"],
            TEXT_ANALYTICS_KEY: process.env["TEXT_ANALYTICS_KEY"]
        };
    return settings;
}