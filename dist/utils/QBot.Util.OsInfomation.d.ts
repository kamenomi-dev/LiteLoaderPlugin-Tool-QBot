/// <reference types="node" resolution-mode="require"/>
import * as os from "os";
export declare const QOsInfo: {
    version: typeof os.version;
    getCpuUsage(): Promise<string>;
    getMemUsage(): string;
};
