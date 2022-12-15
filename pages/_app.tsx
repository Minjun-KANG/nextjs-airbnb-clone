import { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";

const app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle></GlobalStyle>
			<Header></Header>
			<Component {...pageProps}></Component>
			<div id="root-modal"></div>
		</>
	);
};

export default app;
