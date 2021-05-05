import styled from "styled-components";

type CardData = {
	name: string;
};

const Card = styled.a`
	background-color: #10b1fe;
	color: #171c28;
	border-radius: 8px;
	width: 80px;
	transition: all 0.2s ease;
	padding: 5px;
	font-size: 16px;
	&:hover {
		transform: translateY(-3px);
		background-color: transparent;
		cursor: pointer;
		color: white;
	}
`;

export { Card };
export type { CardData };
