// import { QClient } from "../QBot.Core.js";
import { readFileSync, writeFile } from 'node:fs';
import { Client } from 'oicq';

export class QUtilConfig_ {
  public UtilConfig!: TQConfig;
  constructor() { this.reload() };

  /**
   * @Todo 2023 02 18 Added For QBot command.
   * 
   * @description to reload the local Config file.
   * @returns boolean
   */
  public reload(): boolean { // [Todo] Command 配置重载
    try {
      this.UtilConfig = JSON.parse(readFileSync('./QBot.Config.json', { encoding: 'utf-8' }));
    } catch {
      throw Error('[QBot] Language of QBot.Config.json is not a JSON! ');
    };

    if (!this.UtilConfig) {
      throw Error('[QBot] QBot.Config.json read failed! ');
    };
    return true;
  };

  /**
   * @Todo 2023 02 18 Added.
   * 
   * @deprecated
   * @param QConfig the Config of the QBot
   * @description set the Config of the QBot.
   */
  public setConfig(QConfig: TQConfig) {
  };

  /**
   * @description get the Config of the QBot
   * @returns the Config data of the QBot.
   */
  public getConfig(): TQConfig { return this.UtilConfig };
};
// readFileSync
// writeFile

export type TQConfig = {
  AllowCommonFunCommand: boolean,
  QBotDataInfo: {
    QNickName: string,
    QUin: number,
    QPassword: string
  },
  IsSingleMode: boolean,
  Single: {
    allowGroupsId: Array<number>,
    allowCommands: Array<string>,
    serversPath: Array<string>,
    plugin: string,
    groupsCallbackScript: string
  }
}