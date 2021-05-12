import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

import { THEME } from "../renderer/config";

import Driver from "./lib/api";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow("main", {
		width: 700,
		height: 350,
		frame: false,
		minWidth: 700,
		minHeight: 350,
		alwaysOnTop: true,
		backgroundColor: THEME.Background,
		resizable: false,
		// webPreferences: {
		// 	devTools: false,
		// },
	});

	const Api = new Driver();

	if (isProd) {
		await mainWindow.loadURL("app://./index.html");
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/`);
	}

	ipcMain.on("exit", () => {
		app.quit();
	});
	ipcMain.on("close", () => {
		mainWindow.minimize();
	});
	ipcMain.on("execute", (e, script) => {
		Api.send(Driver.Types.Execute, { script: script });
	});
	ipcMain.on("inject", () => {
		Api.send(Driver.Types.Inject);
	});
})();

app.on("window-all-closed", () => {
	app.quit();
});
