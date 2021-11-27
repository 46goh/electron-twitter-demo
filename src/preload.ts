import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('myAPI', {
  download: async (urls: string[]): Promise<void> => {
    await ipcRenderer.invoke('download', urls)
  },
})
