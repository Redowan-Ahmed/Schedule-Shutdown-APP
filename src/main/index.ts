import { app, shell, BrowserWindow, ipcMain, nativeImage, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { exec } from 'child_process'
import os from 'os'

const appIcon = nativeImage.createFromPath('/resources/icon.png')

// interface NotficationType {
//   NOTIFICATION_TITLE: string
//   NOTIFICATION_BODY: string
// }

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 570,
    show: false,
    transparent: true,
    // frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      transparent: true,
      devTools: true,
      nodeIntegration: false,
      contextIsolation: true
    },
    fullscreenable: false,
    icon: appIcon
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function showNotification(title: string, body: string): void {
  new Notification({ title: title, body: body, icon: icon}).show()
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('Schedule Shutdown')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('timePickerSubmit', (event, data) => {
    switch (os.platform()) {
      case 'aix':
        console.log('IBM AIX platform')
        exec(`shutdown -F +${data / 60}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)
            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)
            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      case 'android':
        console.log('Android platform')
        exec(`su -c 'reboot -p'`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      case 'darwin':
        console.log('Darwin platform(MacOS, IOS etc)')
        exec(`sudo shutdown -h +${data / 60}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      case 'freebsd':
        console.log('FreeBSD Platform')
        exec(`shutdown -p +${data / 60}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      case 'linux':
        console.log('Linux Platform')
        exec(`shutdown -h +${data / 60}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      case 'openbsd':
        console.log('OpenBSD platform')
        exec(`shutdown -h +${data / 60}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      case 'sunos':
        console.log('SunOS platform')
        exec(`shutdown -i5 -g${data / 60} -y`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      case 'win32':
        console.log('windows platform')
        exec(`shutdown -s -f -t ${data}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)
            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)

            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
        break
      default:
        console.log('unknown platform')
        exec(`shutdown -s -f -t ${data}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`)
            showNotification('Error: Scheduler Error', `Error: ${error.message}`)
            return event.reply('form-submission-response', `Something Went Wrong: ${error.message}`)
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`)
            showNotification('Error: Scheduler Went Wrong', `Error: ${stderr}`)
            return event.reply('form-submission-response', `Something Went Wrong: ${stderr}`)
          }
          console.log(`Output: ${stdout}`)
          showNotification(
            'Success: New Schedule is set',
            'Successfully Scheduled the system shutdown time and its started'
          )
          event.reply(
            'form-submission-response',
            'Successfully Scheduled the system shutdown time and its started'
          )
        })
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
