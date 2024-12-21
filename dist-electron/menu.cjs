"use strict";
const { Menu, app } = require("electron");
const template = [
  {
    label: "文件",
    submenu: [
      {
        label: "新建对话",
        accelerator: "CmdOrCtrl+N",
        click: () => {
        }
      },
      { type: "separator" },
      {
        label: "退出",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Alt+F4",
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: "编辑",
    submenu: [
      { label: "撤销", role: "undo" },
      { label: "重做", role: "redo" },
      { type: "separator" },
      { label: "剪切", role: "cut" },
      { label: "复制", role: "copy" },
      { label: "粘贴", role: "paste" }
    ]
  },
  {
    label: "视图",
    submenu: [
      { label: "重新加载", role: "reload" },
      { label: "强制重新加载", role: "forceReload" },
      { type: "separator" },
      { label: "实际大小", role: "resetZoom" },
      { label: "放大", role: "zoomIn" },
      { label: "缩小", role: "zoomOut" },
      { type: "separator" },
      { label: "全屏", role: "togglefullscreen" }
    ]
  }
];
function createMenu() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
module.exports = { createMenu };
