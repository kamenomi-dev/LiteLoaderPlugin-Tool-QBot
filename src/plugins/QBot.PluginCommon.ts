// import Nodejs Module
import * as threadWorker from "node:worker_threads";

// import QBot core.
import { LogLevel } from "oicq";
import { TCallbackPlugin } from "./QBot.GroupsIndex.js";

export function scriptSend(thread: threadWorker.MessagePort, type: 'Log', logLevel: LogLevel, logData: string): void;
export function scriptSend(thread: threadWorker.MessagePort, type: 'Client' | 'EventMessage', callCommand: string, callArguments: any[]): void;
export function scriptSend(thread: threadWorker.MessagePort, type: 'Log' | 'Client' | 'EventMessage', argument1: string | LogLevel, argument2: any[] | string): void {
  var sendCallback: TCallbackPlugin;
  if (type == 'Log')
    sendCallback = {
      type: 'Log',
      logLevel: argument1 as LogLevel,
      logData: argument2 as string
    };
  else {
    sendCallback = {
      type: type,
      callCommand: argument1,
      callArguments: argument2 as any[]
    };
  };
  thread.postMessage(sendCallback);
};