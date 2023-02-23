// Nodejs Module
import * as thread from "worker_threads";

// QBot Core.
import { TRecvPluginConf } from "./QBot.GroupsIndex.js";
import { scriptSend } from "./QBot.PluginCommon.js";

if (!thread.isMainThread) {
  const threadArgs = thread.workerData as TRecvPluginConf
  const currentPluginConf = threadArgs.currentConfig;
  // scriptSend(thread.parentPort!, 'Log', 'info', JSON.stringify(threadArgs));

  if (threadArgs.callbackId == 0) {
    scriptSend(thread.parentPort!, 'EventMessage', 'reply',
      [
        'getData!', true
      ]
    );
  };

  scriptSend(thread.parentPort!, 'Log', 'info',
    `[QBot] [Script Thread Tdx: ${thread.threadId}] [${currentPluginConf.Name}] SN: ${currentPluginConf.ProcessorScript} CAs: ${threadArgs.recvArguments} CallID: ${threadArgs.callbackId}`
  );
};