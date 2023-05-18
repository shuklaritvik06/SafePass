const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const Cryptr = require("cryptr");
const sqlite = require("sqlite3").verbose();
const isDev = require("electron-is-dev");
const { homedir } = require("os");

require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  return win;
}

function createSplash() {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false
  });
  win.loadURL(`file://${path.join(__dirname, "/splash.html")}`);
  return win;
}

app.on("ready", () => {
  const win = createWindow();
  const splash = createSplash();
  setTimeout(() => {
    splash.close();
    win.show();
  }, 5000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle("createUser", (event, args) => {
  try {
    if (!fs.existsSync("./User.txt")) {
      fs.writeFileSync("./User.txt", args);
    }
  } catch (err) {}
});

ipcMain.handle("createDBEntry", (event, args) => {
  try {
    if (!fs.existsSync(`${homedir()}/.safepass/data.db`)) {
      fs.mkdirSync(`${homedir()}/.safepass`);
      fs.writeFileSync(`${homedir()}/.safepass/data.db`, "");
    }
    const data = fs.readFileSync("./User.txt", "utf8");
    const cryptr = new Cryptr(data + args[args.length - 1]);
    const encryptedString = cryptr.encrypt(args[1]);
    args[1] = encryptedString;
    const db = new sqlite.Database(`${homedir()}/.safepass/data.db`);
    const query = `INSERT INTO data (email,password,domain) VALUES ('${args[0]}','${args[1]}','${args[2]}')`;
    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, domain TEXT)"
      );
      db.run(query);
    });
    db.close();
    return {
      status: "success"
    };
  } catch (err) {
    return {
      status: "error",
      error: err.message
    };
  }
});

ipcMain.handle("getDB", (event, args) => {
  let dataArr = [];
  try {
    const db = new sqlite.Database(`${homedir()}/.safepass/data.db`);
    db.serialize(() => {
      db.each("SELECT * FROM data", (err, row) => {
        dataArr.push(row);
      });
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        db.close();
        dataArr = dataArr.filter((item) =>
          item.domain.includes(args.toLowerCase())
        );
        resolve(dataArr);
      }, 3000);
    });
  } catch (err) {}
});

ipcMain.handle("getPassword", (event, args) => {
  try {
    const data = fs.readFileSync("./User.txt", "utf8");
    const cryptr = new Cryptr(data + args[0]);
    const decrypted = cryptr.decrypt(args[1]);
    return decrypted;
  } catch (err) {}
});
