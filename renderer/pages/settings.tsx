import styled from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";

const Settings = styled.div`
	display: flex;
	height: 320px;
	width: 700px;
`;
const Back = styled.a`
	margin-left: 10px;
	margin-top: 10px;
	svg {
		transition: transform 0.2s ease;
		&:hover {
			transform: rotate(-180deg);
		}
	}
`;
export default function settings(): JSX.Element {
	return (
		<Settings>
			<Back href="/home">
				<AiOutlineLeft size={30} />
			</Back>
		</Settings>
	);
}
