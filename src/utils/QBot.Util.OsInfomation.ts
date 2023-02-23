import * as os from "os";
export const QOsInfo = new class OsInfo_ {
  public version = os.version;
  public async getCpuUsage() {
    function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) };
    function getCpuInfo() {
      const cpus = os.cpus();
      var user = 0, nice = 0, sys = 0, idle = 0, irq = 0, total = 0;

      for (var cpu in cpus) {
        const times = cpus[cpu].times;
        user += times.user;
        nice += times.nice;
        sys += times.sys;
        idle += times.idle;
        irq += times.irq;
      };

      total += user + nice + sys + idle + irq;
      return { idle, total };
    };

    const t1 = getCpuInfo();
    await sleep(1000);
    const t2 = getCpuInfo();
    return (100 - ((t2.idle - t1.idle) / (t2.total - t1.total)) * 100).toFixed(2);
  };

  public getMemUsage() {
    return (100 - (os.freemem() / os.totalmem()) * 100).toFixed(2);
  };
};