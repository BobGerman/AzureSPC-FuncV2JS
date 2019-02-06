module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    try {
        context.bindings.myOutputQueueItem = ["message 1","message 2"];
    } catch (ex) {
        context.log(`Error: ${ex}`);
    }
    context.done();
};