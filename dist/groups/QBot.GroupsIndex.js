import { Worker } from "worker_threads";
export class QGroupIndex_ {
    constructor(QClient, QConfig) {
        QClient.on('message.group', function (groupMessage) {
            var recvCommand;
            var recvArguments;
            const recvGroupId = groupMessage.group_id;
            const recvMessage = groupMessage.raw_message.slice(QConfig.QBotDataInfo.QNickName.length + 1).trimStart();
            const configIsSingle = QConfig.IsSingleMode;
            if (!groupMessage.atme)
                return;
            if (configIsSingle) {
                const groupConf = QConfig.Single;
                if (groupConf.allowGroupsId.indexOf(recvGroupId) == -1)
                    return;
                var isCommandMsg = false;
                groupConf.allowCommands.forEach(function (command) {
                    if (command == recvMessage.slice(0, command.length)) {
                        QClient.logger.info(recvMessage.slice(0, command.length));
                        isCommandMsg = true;
                        recvCommand = command;
                        isCommandMsg;
                        return;
                    }
                    ;
                });
                if (!isCommandMsg)
                    return;
                else
                    recvArguments = recvMessage.slice(recvCommand.length + 1).split(' ');
                ;
                ((QConfig, recvCommand, recvArguments) => {
                    return new Promise((resolve, rejct) => {
                        const scriptThread = new Worker(groupConf.groupsCallbackScript, { workerData: { QConfig, recvGroupId, recvCommand, recvArguments } });
                        const threadId = scriptThread.threadId;
                        scriptThread.on('online', () => this.logger.info(`[QBot] [GroupScript Tdx${threadId}] Processing..! `));
                        scriptThread.on('exit', exitCode => this.logger.info(`[QBot] [GroupScript Tdx${threadId}] Exited! C:${exitCode}`));
                        scriptThread.on('message', procResult => {
                            const threadOrder = procResult;
                            if (threadOrder.type == 'log')
                                this.logger[threadOrder.logLevel](threadOrder.logData);
                            if (threadOrder.type == 'client') {
                                eval(`QClient.${threadOrder.command}(${threadOrder.argument.map(argument => `\'${argument}\'`).toString()})`);
                            }
                            ;
                        });
                    });
                })(QConfig, recvCommand, recvArguments);
            }
            ;
        });
    }
    ;
}
;
export var loggerLevel;
(function (loggerLevel) {
    loggerLevel[loggerLevel["info"] = 0] = "info";
    loggerLevel[loggerLevel["warn"] = 1] = "warn";
    loggerLevel[loggerLevel["error"] = 2] = "error";
    loggerLevel[loggerLevel["fatal"] = 3] = "fatal";
    loggerLevel[loggerLevel["trace"] = 4] = "trace";
    loggerLevel[loggerLevel["mark"] = 5] = "mark";
    loggerLevel[loggerLevel["debug"] = 6] = "debug";
})(loggerLevel = loggerLevel || (loggerLevel = {}));
export function makeThreadOrder(type, arg1, arg2) {
    if (type == 'log')
        return {
            type: 'log',
            logLevel: arg1,
            logData: arg2
        };
    return {
        type: 'client',
        command: arg1,
        argument: arg2
    };
}
