import { THEME } from "config";
import styled from "styled-components";
import { Card } from "@styles/card.theme";
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
const BackSettings = styled.a`
	margin-left: 10px;
	margin-top: 10px;
	cursor: pointer;
	svg {
		transition: transform 0.2s ease;
		&:hover {
			transform: rotate(-180deg);
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
	let SettingsButton = () => {};

	return (
		<>
			<div style={{ display: SettingsOpen ? "block" : "none" }}>
				<Settings>
					<BackSettings
						onClick={() => {
							setSettingsOpen(false);
						}}
					>
						<AiOutlineLeft size={30} />
					</BackSettings>
				</Settings>
			</div>
			<div
				style={{
					display: SettingsOpen ? "none" : "block",
				}}
			>
				<Mid theme={THEME}>
					<EditorHolder>
						{CodeMirror ? (
							<CodeMirror
								value="print('Hello, World!')"
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
					<Card onClick={Execute}>Execute</Card>
					<Card
						onClick={() => {
							alert("Load Script Yay");
						}}
					>
						Load Script
					</Card>
					<Card
						onClick={() => {
							alert("Save Script Yay");
						}}
					>
						Save Script
					</Card>
					<Card onClick={Inject}>Inject</Card>
					<Card
						onClick={() => {
							setSettingsOpen(true);
						}}
					>
						Settings
					</Card>
					<Card
						onClick={() => {
							alert("Script Hub Yay");
						}}
					>
						Script Hub
					</Card>
				</Bottom>
			</div>
		</>
	);
}
