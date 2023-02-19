export declare class QUtilConfig_ {
    UtilConfig: TQConfig;
    constructor();
    reload(): boolean;
    setConfig(QConfig: TQConfig): void;
    getConfig(): TQConfig;
}
export type TQConfig = {
    AllowCommonFunCommand: boolean;
    QBotDataInfo: {
        QNickName: string;
        QUin: number;
        QPassword: string;
    };
    IsSingleMode: boolean;
    Single: {
        allowGroupsId: Array<number>;
        allowCommands: Array<string>;
        serversPath: Array<string>;
        plugin: string;
        groupsCallbackScript: string;
    };
};
