import { app, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

import { THEME } from "../renderer/config";

import Communication from "./lib/api";

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
		backgroundColor: THEME.Background,
		webPreferences: {
			devTools: false,
		},
	});

	const Api = new Communication();

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
		Api.send(Communication.Types.Execute, { script: script });
	});
	ipcMain.on("inject", () => {
		Api.send(Communication.Types.Inject);
	});
	ipcMain.on("load", () => {
		dialog.showOpenDialog({
			defaultPath: app.getPath("desktop"),
			buttonLabel: "Load Script",
			filters: [{ name: "*", extensions: ["lua", "txt"] }],
		});
	});

	ipcMain.on("save", () => {
		dialog.showSaveDialog({
			defaultPath: app.getPath("desktop"),
			buttonLabel: "Save Script",
			filters: [{ name: "*", extensions: ["lua", "txt"] }],
		});
	});
})();

app.on("window-all-closed", () => {
	app.quit();
});
