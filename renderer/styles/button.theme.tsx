import styled from "styled-components";
import { THEME } from "../config";

const Button = styled.button`
	outline: none;
	border: none;
	background-color: ${THEME.Highlight};
	border-radius: 5px;
	width: 100px;
	transition: all 0.2s ease;
	padding: 10px;
	font-size: 11.5px;
	font-family: SF;

	svg {
		margin-left: 5px;
		transition: all ease 0.4s;
	}

	:hover {
		cursor: pointer;
		svg {
			transform: translateX(7.5px);
		}
	}

	box-shadow: 0px 0px 5px ${THEME.Highlight};
	transition: all 0.2s ease;
	:hover {
		box-shadow: 0px 3px 20px ${THEME.Highlight};
	}
`;

export { Button };
