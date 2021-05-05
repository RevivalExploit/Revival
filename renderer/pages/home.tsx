import { THEME } from "config";
import styled from "styled-components";
import { Card } from "@styles/card.theme";
import Editor from "@components/editor";

const Scripts = styled.div`
	height: 250px;
	width: 135px;
`;

/*const Editor = styled.div`
	height: 250px;
	width: 535px;
`;
	
*/

const Mid = styled.div`
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	${Editor}, ${Scripts} {
		background-color: ${(props) => props.theme.Foreground};
		border-radius: 8px;
	}
	${Editor} {
		margin-left: 10px;
	}
	${Scripts} {
		margin-right: 10px;
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

export default function home(): JSX.Element {
	return (
		<>
			<Mid theme={THEME}>
				<Editor />
				<Scripts />
			</Mid>
			<Bottom theme={THEME}>
				<Card
					onClick={() => {
						alert("Executed Yay");
					}}
				>
					Execute
				</Card>
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
				<Card
					onClick={() => {
						alert("Inject Yay");
					}}
				>
					Inject
				</Card>
				<Card href="/settings">Settings</Card>
				<Card
					onClick={() => {
						alert("Script Hub Yay");
					}}
				>
					Script Hub
				</Card>
			</Bottom>
		</>
	);
}
