import React from "react";
import SignUpModal from "./SignUpModal";
import { useSelector, RootState } from "../../store";
import styled from "styled-components";
import LoginModal from "./LoginModal";

interface IProps {
	closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
	const authMode = useSelector((state: RootState) => state.auth.authMode);

	return (
		<Container>
			{authMode === "signup" && <SignUpModal closeModal={closeModal} />}
			{authMode === "login" && <LoginModal closeModal={closeModal} />}
		</Container>
	);
};

export default AuthModal;

const Container = styled.div`
	z-index: 11;
`;
