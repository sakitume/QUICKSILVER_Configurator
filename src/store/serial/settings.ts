const isAndroid = /(android)/i.test(navigator.userAgent);

const androidSerialSettings = {
  baudRate: 921600,
  bufferSize: 64,
  updateInterval: 1000,
};

const desktopSerialSettings = {
  baudRate: 921600,
  bufferSize: 4 * 1024 * 1024,
  updateInterval: 250,
};

export const settings = {
  serial: isAndroid ? androidSerialSettings : desktopSerialSettings,
};
