export declare class CQUtilConfig {
    QBotConfig: TQBotConfig;
    constructor();
    save(): void;
}
export type TQBotConfig = {
    QBotNickName: string;
    QBotUin: number;
    QBotPassword: string;
    PluginConfig: {
        IsSinglePlugin: true;
        SinglePlugin: TPluginConfig;
        MultiPlugins: TPluginConfig[];
    };
};
export type TPluginConfig = {
    AllowGroupId: number[];
    AllowCommands: TAllowCommand[];
    Name: string;
    ProcessorScript: string;
    ControlServerPath: string;
};
export type TAllowCommand = {
    Permission: 'User' | 'Admin' | 'Owner';
    Command: string;
    Alias: string;
    CallbackId: number;
};
