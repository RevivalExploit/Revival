import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { EventEmitter } from "events";

enum Types {
	Inject = "inject",
	Execute = "execute",
}

interface Data {
	ScriptPath?: string;
}

const isProd: boolean = process.env.NODE_ENV === "production";

export default class Communication extends EventEmitter {
	_pipe: ChildProcessWithoutNullStreams;

	constructor() {
		super();
		this._pipe = spawn("./Driver.exe", { stdio: "pipe", cwd: __dirname });
		this._pipe.stdout.on("data", (data) => {
			data = data.toString().split("\n");
			/*for (const s in data) {
                this.emit(s)
            }*/
		});
	}

	send(Type: Types, Data?: Data) {
		this._pipe.stdin.cork();
		this._pipe.stdin.write(
			JSON.stringify({
				Type: Type,
				Data: Data,
			}) + "\r\n"
		);
		process.nextTick(() => this._pipe.stdin.uncork());
	}
}
