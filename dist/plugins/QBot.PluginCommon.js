export function scriptSend(thread, type, argument1, argument2) {
    var sendCallback;
    if (type == 'Log')
        sendCallback = {
            type: 'Log',
            logLevel: argument1,
            logData: argument2
        };
    else {
        sendCallback = {
            type: type,
            callCommand: argument1,
            callArguments: argument2
        };
    }
    ;
    thread.postMessage(sendCallback);
}
;
