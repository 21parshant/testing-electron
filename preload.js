const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld("click",{
    testing: ()=>{
        const webview = document.getElementById("myweb");
        const btn = document.getElementById("testing-btn")
        console.log(btn.offsetWidth,btn.offsetHeight,btn.offsetLeft,btn.offsetTop)
         const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = webview;
         ipcRenderer.send("click-testing-btn",{offsetWidth, offsetHeight, offsetLeft, offsetTop })
    }
})
