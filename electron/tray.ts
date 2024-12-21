import { Tray, Menu, app } from 'electron';
import path from 'path';

let tray: Tray | null = null;

export function createTray() {
  tray = new Tray(path.join(__dirname, '../resources/icon.png'));
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: () => {
        BrowserWindow.getAllWindows()[0]?.show();
      },
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('AI Chat Assistant');
  tray.setContextMenu(contextMenu);
} 