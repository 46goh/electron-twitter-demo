declare global {
  interface Window {
    myAPI: Sandbox
  }
}

export interface Sandbox {
  download: (urls: string[]) => Promise<void>
}
