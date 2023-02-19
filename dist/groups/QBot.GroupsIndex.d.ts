import { Client } from "oicq";
import { TQConfig } from "../utils/QBot.Util.Config.js";
export declare class QGroupIndex_ {
    constructor(QClient: Client, QConfig: TQConfig);
}
export type TThreadOrder = {
    type: 'log';
    logLevel: keyof typeof loggerLevel;
    logData: any;
} | {
    type: 'client';
    command: string;
    argument: string[];
};
export declare enum loggerLevel {
    'info' = 0,
    'warn' = 1,
    'error' = 2,
    'fatal' = 3,
    'trace' = 4,
    'mark' = 5,
    'debug' = 6
}
export declare function makeThreadOrder(type: 'log', logLevel: keyof typeof loggerLevel, logData: any): TThreadOrder;
export declare function makeThreadOrder(type: 'client', command: string, argument: string[]): TThreadOrder;
