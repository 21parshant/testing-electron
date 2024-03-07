const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            contentSecurityPolicy:
                "default-src 'self'; script-src 'self' 'unsafe-inline';",
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.webContents.openDevTools()
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on("click-testing-btn", async (event, dimensions) => {
    const { mouse, straightTo, Point, Button, MouseClass } = require("@nut-tree/nut-js");

    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = dimensions;

    mouse.config.autoDelayMs = 50
    mouse.config.mouseSpeed = 1500

    let x = offsetWidth * 0.823
    let y =  offsetHeight * 0.479
    // let diff = win.getSize()[1] - win.getContentSize()[1]
    console.log(x, y)
    await mouse.move(straightTo(new Point(x, y)))
    await mouse.click(Button.LEFT);

    // console.log(offsetWidth, offsetHeight, offsetLeft, offsetTop)

})