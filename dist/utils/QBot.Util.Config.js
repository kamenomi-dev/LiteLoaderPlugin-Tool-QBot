import { existsSync, readFileSync, writeFileSync } from "fs";
export class CQUtilConfig {
    QBotConfig;
    constructor() {
        if (!existsSync('./QBot.Config.json'))
            throw Error('QBot.Config.json isn\'t exist! Please, try to download again.');
        try {
            this.QBotConfig = JSON.parse(readFileSync('./QBot.Config.json').toString('utf-8'));
        }
        catch {
            throw Error('QBot.Config.json isn\'t a JSON File! ');
        }
        ;
    }
    ;
    save() {
        writeFileSync('./QBot.Config.json', this.QBotConfig.toString());
    }
}
;
