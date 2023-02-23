import { Client, LogLevel } from "oicq";
import { TPluginConfig, TQBotConfig } from "../utils/QBot.Util.Config.js";
export declare class CQGroupIndex {
    constructor(QClient: Client, QBotConfig: TQBotConfig);
}
export type TRecvPluginConf = {
    recvBotName: string;
    recvGroupId: number;
    recvSenderUin: number;
    recvArguments: any[];
    callbackId: number;
    currentConfig: TPluginConfig;
};
export type TCallbackPlugin = {
    type: 'Log';
    logLevel: LogLevel;
    logData: string;
} | {
    type: 'Client' | "EventMessage";
    callCommand: string;
    callArguments: any[];
};
