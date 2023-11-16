type UserInfo = {
  type: string;
  rtt: number;
  downlink: number;
};

type InitConfig = {
  updateTime?: number;
  onUpdate: Function;
};

var watcherConfig: InitConfig;

const initVirtualWatcher = (initConfig: InitConfig) => {
  watcherConfig = initConfig;
  getNetworkInfo();
  mySetInterval(getNetworkInfo, watcherConfig.updateTime || 1000);
};

const getNetworkInfo = () => {
  const navigator = window.navigator as any;
  let userInfo: UserInfo = {
    type: "offLine",
    rtt: 0,
    downlink: 0,
  };
  if (navigator?.onLine) {
    userInfo.type = navigator?.connection.effectiveType;
    userInfo.rtt = navigator?.connection.rtt;
    userInfo.downlink = navigator?.connection.downlink;
  }
  watcherConfig.onUpdate(userInfo);
};

const mySetInterval = (fn: Function, delay: number) => {
  let timer: any;
  function interval() {
    fn();
    timer = setTimeout(interval, delay);
  }
  timer = setTimeout(interval, delay);
  return {
    close: () => {
      clearTimeout(timer);
    },
  };
};

export { initVirtualWatcher, UserInfo, InitConfig };
