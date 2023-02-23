import { Platform, createClient } from "oicq";
import { CQGroupIndex } from "./plugins/QBot.GroupsIndex.js";
import { CQUtilConfig } from "./utils/QBot.Util.Config.js";

const QUtilConfig = new CQUtilConfig();
var QBotDataInfo = QUtilConfig.QBotConfig;

const QClient = createClient(QBotDataInfo.QBotUin, {
  "platform": Platform.Watch,
  "ignore_self": true
});

const QGroupIndex = new CQGroupIndex(QClient, QUtilConfig.QBotConfig);

initQBot();
function initQBot() {
  QClient.on('system.login.qrcode', function (QRcodeBuff) {
    this.logger.info('[QBot] before login! press \'Enter\' to continue to login.');
    process.stdin.once('data', () => { this.login() });

    QClient.on('system.login.slider', function(checkUrl) {
      this.logger.mark(`[QBot] input the Ticket and press \'Enter\'`);
      process.stdin.once('data', ticket => {
        this.submitSlider(ticket.toString());
      })
    })
  }).login(QBotDataInfo.QBotPassword);

  QClient.on('system.online', function () {
    this.logger.info('[QBot] Successfully login! ');
    ; (() => {
      if (!QUtilConfig.QBotConfig) {
        this.logger.info('[QBot] Failed to load Config! ');
        return;
      }
      this.logger.mark(QUtilConfig);
      this.logger.info('[QBot] Loaded Config! ');
      this.setNickname(QBotDataInfo.QBotNickName);
    })();
  });
};

export { QClient, QUtilConfig, QGroupIndex };