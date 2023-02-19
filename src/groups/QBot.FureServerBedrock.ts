import { TQConfig } from "../utils/QBot.Util.Config.js";
import { makeThreadOrder } from "./QBot.GroupsIndex.js";
import * as thread from "worker_threads";
const pluginConf = {
  processor: 'FureServerBedrockProcessor',
  version: [1, 0, 0, 0] // [Todo] but it wont do.
};

if (!thread.isMainThread) {
  const threadArgs = thread.workerData as
    {
      QConfig: TQConfig,
      recvGroupId: number
      recvCommand: string,
      recvArguments: string[]
    };

  if (threadArgs.recvCommand == 'say' || threadArgs.recvCommand == 'say')
    thread
      .parentPort
      ?.postMessage(
        makeThreadOrder(
          'client',
          'sendGroupMsg',
          [String(threadArgs.recvGroupId), threadArgs.recvArguments[0]]
        )
      );



  thread
    .parentPort
    ?.postMessage(
      makeThreadOrder(
        'log',
        'info',
        `[QBot] [GroupScript Tdx${thread.threadId}] [${pluginConf.processor}] RC: ${threadArgs.recvCommand} RA: ${threadArgs.recvArguments}`
      )
    );
}

