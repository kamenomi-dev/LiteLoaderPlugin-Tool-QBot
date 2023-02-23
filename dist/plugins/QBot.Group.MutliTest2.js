import * as thread from "node:worker_threads";
import { scriptSend } from "./QBot.PluginCommon.js";
if (!thread.isMainThread) {
    const threadArgs = thread.workerData;
    const currentPluginConf = threadArgs.currentConfig;
    if (threadArgs.callbackId == 0) {
        scriptSend(thread.parentPort, 'EventMessage', 'reply', [
            'getData!', true
        ]);
    }
    ;
    scriptSend(thread.parentPort, 'Log', 'info', `[QBot] [Script Thread Tdx: ${thread.threadId}] [${currentPluginConf.Name}] SN: ${currentPluginConf.ProcessorScript} CAs: ${threadArgs.recvArguments} CallID: ${threadArgs.callbackId}`);
}
;
