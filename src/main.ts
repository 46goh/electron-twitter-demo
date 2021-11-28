import path from 'path'
import { BrowserWindow, app, session, ipcMain } from 'electron'
import ElectronReload from 'electron-reload'
import { searchDevtools } from 'electron-search-devtools'
import Twitter from 'twitter-v2'

import electronDl, { download } from 'electron-dl'

const isDev = process.env.NODE_ENV === 'development'

/// #if DEBUG
const execPath =
  process.platform === 'win32'
    ? '../node_modules/electron/dist/electron.exe'
    : '../node_modules/.bin/electron'

// 開発モードの場合はホットリロードする
if (isDev) {
  ElectronReload(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit',
  })
}
/// #endif

// setup electron-dl
electronDl()

// BrowserWindow インスタンスを作成する関数
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })

  if (isDev) {
    // 開発モードの場合はデベロッパーツールを開く
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  // レンダラープロセスをロード
  mainWindow.loadFile('dist/index.html')

  // ダウンロード処理
  ipcMain.handle('download', async () => {
    const client = new Twitter({
      bearer_token: '*** BEARER TOKEN ***',
    })

    const userId = '*** user id ***'
    const data = await client.get(`users/${userId}/liked_tweets`, {
      expansions: 'attachments.media_keys',
      'media.fields': 'url',
    })

    const downloadURLs: string[] = data.includes.media
      .map((medium: { url?: string }) => {
        return medium.url
      })
      .filter((url: string | typeof undefined) => typeof url === 'string')

    downloadURLs.forEach(async (url) => {
      const downloadItem = await download(mainWindow, url)
      await new Promise((resolve) => {
        downloadItem.once('done', () => resolve(null))
      })
    })
  })
}

app.whenReady().then(async () => {
  if (isDev) {
    // 開発モードの場合は React Devtools をロード
    const devtools = await searchDevtools('REACT')
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true,
      })
    }
  }

  // BrowserWindow インスタンスを作成
  createWindow()
})

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit())
