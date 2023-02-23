import * as thread from "worker_threads";
export class CQGroupIndex {
    constructor(QClient, QBotConfig) {
        QClient.on('message.group', async function (EventMessage) {
            if (!EventMessage.atme)
                return;
            if (EventMessage.message[0].type != 'at')
                return;
            var pluginInfomation;
            var pluginCallbackId = -1;
            var pluginAllowCommandIdx = -1;
            var recvArguments;
            const recvBotName = EventMessage.message[0].text || QBotConfig.QBotNickName;
            const recvGroupId = EventMessage.group_id;
            const recvGroupMsg = EventMessage.raw_message.slice(recvBotName.length + 1).trimStart();
            const recvSenderUin = EventMessage.sender.user_id;
            ;
            (() => {
                if (QBotConfig.PluginConfig.IsSinglePlugin) {
                    let singlePluginInfomation = QBotConfig.PluginConfig.SinglePlugin;
                    for (let commandIdx = 0; commandIdx < singlePluginInfomation.AllowCommands.length; commandIdx++) {
                        const selectCommand = singlePluginInfomation.AllowCommands[commandIdx];
                        let inputCommand = recvGroupMsg.slice(0, selectCommand.Command.length);
                        let inputAlias = recvGroupMsg.slice(0, selectCommand.Alias.length);
                        if (selectCommand.Command == inputCommand || selectCommand.Alias == inputAlias) {
                            pluginInfomation = singlePluginInfomation;
                            pluginAllowCommandIdx = commandIdx;
                            pluginCallbackId = selectCommand.CallbackId;
                            break;
                        }
                        ;
                    }
                    ;
                    return;
                }
                ;
                const multiPluginInfomation = QBotConfig.PluginConfig.MultiPlugins;
                for (let pluginIdx = 0; pluginIdx < multiPluginInfomation.length; pluginIdx++) {
                    const pluginInfo = multiPluginInfomation[pluginIdx];
                    for (let commandIdx = 0; commandIdx < pluginInfo.AllowCommands.length; commandIdx++) {
                        const selectCommand = pluginInfo.AllowCommands[commandIdx];
                        let inputCommand = recvGroupMsg.slice(0, selectCommand.Command.length);
                        let inputAlias = recvGroupMsg.slice(0, selectCommand.Alias.length);
                        if (selectCommand.Command == inputCommand || selectCommand.Alias == inputAlias) {
                            pluginInfomation = pluginInfo;
                            pluginAllowCommandIdx = commandIdx;
                            pluginCallbackId = selectCommand.CallbackId;
                            break;
                        }
                        ;
                    }
                }
                ;
            })();
            if (typeof pluginInfomation == 'undefined' || pluginCallbackId == -1 || pluginAllowCommandIdx == -1)
                return;
            const senderPermission = EventMessage.sender.role;
            const commandPermission = pluginInfomation.AllowCommands[pluginAllowCommandIdx].Permission;
            if (commandPermission == 'Owner' && senderPermission != 'owner')
                return;
            if (commandPermission == 'Admin' && senderPermission == 'member')
                return;
            ;
            (function (QClient) {
                return new Promise((resolve, reject) => {
                    QClient.logger.info(`[QBot] [GroupsIndex] scriptThread Create. SN: ${pluginInfomation?.Name} CAs: ${recvArguments} CallID: ${pluginCallbackId}`);
                    const scriptThread = new thread.Worker(pluginInfomation.ProcessorScript, {
                        workerData: {
                            recvBotName: recvBotName,
                            recvGroupId: recvGroupId,
                            recvSenderUin: recvSenderUin,
                            recvArguments: recvArguments,
                            callbackId: pluginCallbackId,
                            currentConfig: pluginInfomation
                        }
                    });
                    const threadId = scriptThread.threadId;
                    scriptThread.on('online', () => QClient.logger.info(`[QBot] [scriptThread Tdx: ${threadId}] Online! `));
                    scriptThread.on('error', error => QClient.logger.info(`[QBot] [scriptThread Tdx: ${threadId}] Error! \n${error}`));
                    scriptThread.on('exit', () => QClient.logger.info(`[QBot] [scriptThread Tdx: ${threadId}] Completed! `));
                    scriptThread.on('message', (callbackResult) => {
                        if (callbackResult.type == 'Log') {
                            if (callbackResult.logLevel == 'off') {
                                QClient.logger.error(`[QBot] [scriptThread Tdx: ${threadId}] Send unknown data! `);
                                return;
                            }
                            ;
                            QClient.logger[callbackResult.logLevel](callbackResult.logData);
                            return;
                        }
                        ;
                        var fixArguments = callbackResult.callArguments;
                        fixArguments.map(argument => {
                            const typeArgument = typeof argument;
                            if (typeArgument == 'string') {
                                return `\`${argument}WHY\``;
                            }
                            else {
                                return argument;
                            }
                            ;
                        });
                        QClient.logger.info(fixArguments);
                        if (callbackResult.type == 'Client') {
                            eval(`QClient.${callbackResult.callCommand}(${fixArguments.toString()})`);
                        }
                        if (callbackResult.type == 'EventMessage') {
                            eval(`EventMessage.${callbackResult.callCommand}(${fixArguments.toString()})`);
                        }
                        ;
                    });
                });
            })(QClient);
        });
    }
    ;
}
;
