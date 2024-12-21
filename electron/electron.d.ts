interface Window {
  electronAPI: {
    sendMessage: (message: string) => void;
    onMessage: (callback: (message: string) => void) => void;
    getVersions: () => {
      node: string;
      chrome: string;
      electron: string;
    };
  };
} 