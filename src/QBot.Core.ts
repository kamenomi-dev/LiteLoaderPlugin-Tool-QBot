import { Platform, createClient } from "oicq";
import { QGroupIndex_ } from "./groups/QBot.GroupsIndex.js";
import { QUtilConfig_ } from "./utils/QBot.Util.Config.js";

const QUtilConfig = new QUtilConfig_();
var QBotDataInfo = QUtilConfig.UtilConfig.QBotDataInfo;

const QClient = createClient(QBotDataInfo.QUin, {
  "platform": Platform.Android,
  "ignore_self": true
});

const QGroupIndex = new QGroupIndex_(QClient, QUtilConfig.UtilConfig);

initQBot();
function initQBot() {
  QClient.on('system.login.qrcode', function (QRcodeBuff) {
    this.logger.info('[QBot] before login! press \'Enter\' to continue to login.');
    process.stdin.once('data', () => { this.login(QBotDataInfo.QPassword) });
  }).login(QBotDataInfo.QPassword);

  QClient.on('system.online', function () {
    this.logger.info('[QBot] Successfully login! ');
    ; (() => {
      if (!QUtilConfig.reload()) {
        this.logger.info('[QBot] Failed to load Config! ');
        return;
      }
      this.logger.mark(QUtilConfig.UtilConfig);
      this.logger.info('[QBot] Loaded Config! ');
      this.setNickname(QBotDataInfo.QNickName);
    })();

















  });
};

export { QClient, QUtilConfig, QGroupIndex };