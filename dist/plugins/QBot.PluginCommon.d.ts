/// <reference types="node" resolution-mode="require"/>
import * as threadWorker from "node:worker_threads";
import { LogLevel } from "oicq";
export declare function scriptSend(thread: threadWorker.MessagePort, type: 'Log', logLevel: LogLevel, logData: string): void;
export declare function scriptSend(thread: threadWorker.MessagePort, type: 'Client' | 'EventMessage', callCommand: string, callArguments: any[]): void;
