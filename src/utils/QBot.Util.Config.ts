import { existsSync, readFileSync, writeFileSync } from "fs";

export class CQUtilConfig {
  public QBotConfig: TQBotConfig;
  public constructor() {
    if (!existsSync('./QBot.Config.json'))
      throw Error('QBot.Config.json isn\'t exist! Please, try to download again.');
    try {
      this.QBotConfig = JSON.parse(readFileSync('./QBot.Config.json').toString('utf-8'));
    } catch {
      throw Error('QBot.Config.json isn\'t a JSON File! ');
    };
  };

  public save() {
    writeFileSync('./QBot.Config.json', this.QBotConfig.toString());
  }
};
export type TQBotConfig = {
  QBotNickName: string,
  QBotUin: number,
  QBotPassword: string,
  PluginConfig: {
    IsSinglePlugin: true,
    SinglePlugin: TPluginConfig,
    MultiPlugins: TPluginConfig[]
  }
};
export type TPluginConfig = {
  AllowGroupId: number[],
  AllowCommands: TAllowCommand[],
  Name: string,
  ProcessorScript: string
  ControlServerPath: string,
}
export type TAllowCommand = {
  Permission: 'User' | 'Admin' | 'Owner',
  Command: string,
  Alias: string,
  CallbackId: number // Tips. 自己约定好对应值对应逻辑
}