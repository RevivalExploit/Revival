import { THEME } from "config";
import styled from "styled-components";
import { Button } from "@styles/button.theme";
import { AiOutlineLeft } from "react-icons/ai";
import { ipcRenderer } from "electron";
import { useState } from "react";

let CodeMirror = null;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
	CodeMirror = require("react-codemirror");
	require("codemirror/lib/codemirror.css");
	require("codemirror/theme/nord.css");
	require("codemirror/mode/lua/lua");
}

const EditorHolder = styled.div`
	margin-left: 10px;
	text-align: left;
	.CodeMirror {
		height: 250px;
		width: 520px;
		border-radius: 8px;
	}
`;

const Scripts = styled.div`
	height: 250px;
	width: 135px;
	border-radius: 8px;
`;

const Mid = styled.div`
	margin-top: 10px;
	margin-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	${Scripts} {
		background: ${(props) => props.theme.Foreground};
	}
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	flex: 1 1;
	height: 60px;
`;

const Settings = styled.div`
	display: flex;
	height: 320px;
	width: 700px;
`;

const ScriptHub = styled.div`
	display: flex;
	height: 320px;
	width: 700px;
`;

const Back = styled.a`
	margin-left: 10px;
	margin-top: 10px;
	cursor: pointer;
	svg {
		transition: transform 0.2s ease;
		&:hover {
			transform: translateX(-10px);
		}
	}
`;

export default function home(): JSX.Element {
	let Editor: any;

	let refCallback = (ref) => {
		if (ref && ref.codeMirror) {
			Editor = ref.codeMirror;
		}
	};

	let Execute = () => {
		alert(Editor.getValue());
		ipcRenderer.send("execute", Editor.getValue());
	};

	let Inject = () => {
		ipcRenderer.send("inject");
	};



	let [SettingsOpen, setSettingsOpen] = useState(false);
	let [ScriptHubOpen, setScriptHubOpen] = useState(false);

	return (
		<>
			<div
				style={{
					display: SettingsOpen && !ScriptHubOpen ? "block" : "none",
				}}
			>
				<Settings>
					<Back
						onClick={() => {
							setSettingsOpen(false);
						}}
					>
						<AiOutlineLeft size={30} />
					</Back>
				</Settings>
			</div>
			<div
				style={{
					display: !SettingsOpen && ScriptHubOpen ? "block" : "none",
				}}
			>
				<ScriptHub>
					<Back
						onClick={() => {
							setScriptHubOpen(false);
						}}
					>
						<AiOutlineLeft size={30} />
					</Back>
				</ScriptHub>
			</div>
			<div
				style={{
					display: SettingsOpen || ScriptHubOpen ? "none" : "block",
				}}
			>
				<Mid theme={THEME}>
					<EditorHolder>
						{CodeMirror ? (
							<CodeMirror
								value='print("Hello, World!")'
								options={{
									mode: "lua",
									theme: "nord",
									lineNumbers: true,
									lineWrapping: true,
								}}
								ref={refCallback}
							/>
						) : (
							<></>
						)}
					</EditorHolder>
					<Scripts />
				</Mid>
				<Bottom theme={THEME}>
					<Button onClick={Execute}>Execute</Button>
					<Button
						onClick={() => {
							ipcRenderer.send("load");
						}}
					>
						Load Script
					</Button>
					<Button
						onClick={() => {
							ipcRenderer.send("save");
						}}
					>
						Save Script
					</Button>
					<Button onClick={Inject}>Inject</Button>
					<Button
						onClick={() => {
							setSettingsOpen(true);
						}}
					>
						Settings
					</Button>
					<Button
						onClick={() => {
							setScriptHubOpen(true);
						}}
					>
						Script Hub
					</Button>
				</Bottom>
			</div>
		</>
	);
}
