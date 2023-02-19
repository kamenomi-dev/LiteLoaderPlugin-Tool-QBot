import { readFileSync } from 'node:fs';
export class QUtilConfig_ {
    UtilConfig;
    constructor() { this.reload(); }
    ;
    reload() {
        try {
            this.UtilConfig = JSON.parse(readFileSync('./QBot.Config.json', { encoding: 'utf-8' }));
        }
        catch {
            throw Error('[QBot] Language of QBot.Config.json is not a JSON! ');
        }
        ;
        if (!this.UtilConfig) {
            throw Error('[QBot] QBot.Config.json read failed! ');
        }
        ;
        return true;
    }
    ;
    setConfig(QConfig) {
    }
    ;
    getConfig() { return this.UtilConfig; }
    ;
}
;
