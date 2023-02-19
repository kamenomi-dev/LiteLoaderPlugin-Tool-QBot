import { Client } from "oicq";
import { TQConfig } from "../utils/QBot.Util.Config.js";
import { Worker } from "worker_threads";

export class QGroupIndex_ {
  constructor(QClient: Client, QConfig: TQConfig) {
    QClient.on('message.group', function (groupMessage) {
      var recvCommand!: string;
      var recvArguments!: Array<string>;
      const recvGroupId = groupMessage.group_id;
      const recvMessage = groupMessage.raw_message.slice(QConfig.QBotDataInfo.QNickName.length + 1).trimStart();
      const configIsSingle = QConfig.IsSingleMode;

      if (!groupMessage.atme)
        return;

      // Single Options Logic.
      if (configIsSingle) {
        const groupConf = QConfig.Single;
        if (groupConf.allowGroupsId.indexOf(recvGroupId) == -1)
          return;

        var isCommandMsg: boolean = false;
        groupConf.allowCommands.forEach(function (command) {
          if (command == recvMessage.slice(0, command.length)) {
            QClient.logger.info(recvMessage.slice(0, command.length));
            isCommandMsg = true;
            recvCommand = command;
            isCommandMsg;
            return;
          };
        });

        if (!isCommandMsg)
          return;
        else
          recvArguments = recvMessage.slice(recvCommand.length + 1).split(' ');

        ; ((QConfig: TQConfig, recvCommand: string, recvArguments: string[]) => {
          return new Promise((resolve, rejct) => {
            const scriptThread = new Worker(groupConf.groupsCallbackScript, { workerData: { QConfig, recvGroupId, recvCommand, recvArguments } }); // u can also don't close it, it is auto close.
            const threadId = scriptThread.threadId;

            scriptThread.on('online', () => this.logger.info(`[QBot] [GroupScript Tdx${threadId}] Processing..! `));
            scriptThread.on('exit', exitCode => this.logger.info(`[QBot] [GroupScript Tdx${threadId}] Exited! C:${exitCode}`));
            scriptThread.on('message', procResult => {
              const threadOrder = procResult as TThreadOrder;

              if (threadOrder.type == 'log')
                this.logger[threadOrder.logLevel](threadOrder.logData);

              if (threadOrder.type == 'client') {
                eval(`QClient.${threadOrder.command}(${threadOrder.argument.map(argument => `\'${argument}\'`).toString()})`);
                // [Todo] [Won't Fix] Interval Bug.
              };
            });
          });
        })(QConfig, recvCommand, recvArguments);
      };
    });
  };
};

export type TThreadOrder = {
  type: 'log',
  logLevel: keyof typeof loggerLevel,
  logData: any
} | {
  type: 'client',
  command: string,
  argument: string[]
};
export enum loggerLevel {
  'info', 'warn', 'error', 'fatal', 'trace', 'mark', 'debug'
}

export function makeThreadOrder(type: 'log', logLevel: keyof typeof loggerLevel, logData: any): TThreadOrder
export function makeThreadOrder(type: 'client', command: string, argument: string[]): TThreadOrder
export function makeThreadOrder(type: 'log' | 'client', arg1: keyof typeof loggerLevel | string, arg2: string[] | any): TThreadOrder {
  if (type == 'log')
    return {
      type: 'log',
      logLevel: arg1 as keyof typeof loggerLevel,
      logData: arg2 as any
    };
  return {
    type: 'client',
    command: arg1,
    argument: arg2
  }
}