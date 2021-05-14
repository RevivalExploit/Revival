import { AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { THEME } from "config";
import { shell, ipcRenderer } from "electron";

const Top = styled.div`
	-webkit-app-region: drag;
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	* {
		-webkit-app-region: no-drag;
	}

	.logo {
		margin-left: 10px;
		transition: color 0.1s ease;
		&:hover {
			cursor: pointer;
			color: ${(props) => props.theme.Keyword};
		}
	}

	.nav-buttons {
		height: 100%;
		* {
			margin: 3px 10px;
			transition: color 0.1s ease;
			&:hover {
				cursor: pointer;
				color: ${(props) => props.theme.Keyword};
			}
		}
	}
`;

export default function topBar() {
	return (
		<Top theme={THEME}>
			<a
				onClick={() => {
					shell.openExternal("https://revivalexploit.com");
				}}
			>
				<h4 className="logo">Revival</h4>
			</a>
			<div className="nav-buttons">
				<AiOutlineMinus
					size={25}
					onClick={() => {
						const ipcRenderere = ipcRenderer || false;
						if (ipcRenderere) {
							ipcRenderere.send("close");
						}
					}}
				/>
				<AiOutlineClose
					size={25}
					onClick={() => {
						const ipcRenderere = ipcRenderer || false;
						if (ipcRenderere) {
							ipcRenderere.send("exit");
						}
					}}
				/>
			</div>
		</Top>
	);
}
