"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  // 示例：发送消息到主进程
  sendMessage: (message) => ipcRenderer.send("message", message),
  // 示例：从主进程接收消息
  onMessage: (callback) => {
    ipcRenderer.on("message", (_event, message) => callback(message));
  },
  // 获取版本信息
  getVersions: () => ({
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  })
});
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type] || "");
  }
});
//# sourceMappingURL=preload.js.map
