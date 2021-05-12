import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { EventEmitter } from "events";

interface Data {
	script?: string;
}

enum Types {
	Inject = "inject",
	Execute = "execute",
}

const isProd: boolean = process.env.NODE_ENV === "production";

class Communication extends EventEmitter {
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

namespace Communication {
	export enum Types {
		Inject = "inject",
		Execute = "execute",
	}
}

export default Communication;
