import { CQGroupIndex } from "./plugins/QBot.GroupsIndex.js";
import { CQUtilConfig } from "./utils/QBot.Util.Config.js";
declare const QUtilConfig: CQUtilConfig;
declare const QClient: import("oicq").Client;
declare const QGroupIndex: CQGroupIndex;
export { QClient, QUtilConfig, QGroupIndex };
