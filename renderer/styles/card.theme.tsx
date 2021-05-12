import styled from "styled-components";
import { THEME } from "./../config";

type CardData = {
	name: string;
};

const Card = styled.a`
	background-color: #10b1fe;
	color: #171c28;
	border-radius: 5px;
	width: 80px;
	transition: all 0.2s ease;
	padding: 5px;
	font-size: 16px;
	&:hover {
		background: #0a75a7;
		transform: translateY(-2px);
		border-radius: 10px;
		cursor: pointer;
		color: white;
	}
`;

export { Card };
export type { CardData };
