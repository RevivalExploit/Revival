import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

import { THEME } from "../renderer/config";

import Driver from "../main/helpers/api";

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

	if (isProd) {
		await mainWindow.loadURL("app://./home.html");
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/home`);
	}

	ipcMain.on("exit", () => {
		app.quit();
	});
	ipcMain.on("close", () => {
		mainWindow.minimize();
	});
})();

app.on("window-all-closed", () => {
	app.quit();
});
