import dynamic from "next/dynamic";
import { Component } from "react";
import styled from "styled-components";

let CodeMirror = null;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
	CodeMirror = require("react-codemirror");
	require("codemirror/lib/codemirror.css");
	require("codemirror/theme/nord.css");
	require("codemirror/mode/lua/lua");
}

const Holder = styled.div`
	margin-left: 10px;
	text-align: left;
	.CodeMirror {
		height: 250px;
		width: 535px;
		border-radius: 8px;
	}
`;

export default class Editor extends Component {
	CodeMirror: any;

	render() {
		return (
			<Holder>
				{CodeMirror ? (
					<CodeMirror
						value="print('Hello, World!')"
						options={{
							mode: "lua",
							theme: "nord",
							lineNumbers: true,
							lineWrapping: true,
						}}
					/>
				) : (
					<></>
				)}
			</Holder>
		);
	}
}
