declare global {
  interface Window {
    myAPI: Sandbox
  }
}

export interface Sandbox {
  download: () => Promise<void>
}
