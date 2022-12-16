import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import { cookieStringObject } from "../lib/utils";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

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

export default wrapper.withRedux(app);

app.getInitialProps = async (context: AppContext) => {
	const appInitialProps = await App.getInitialProps(context);
	const cookieObject = cookieStringObject(context.ctx.req?.headers.cookie);
	const { store } = context.ctx;
	const { isLogged } = store.getState().user;
	try {
		if (!isLogged && cookieObject.access_token) {
			axios.defaults.headers.cookie = cookieObject.access_token;
			const { data } = await meAPI();
			store.dispatch(userActions.setLoggedUser(data));
		}
	} catch (e) {
		console.log(e);
	}
	return { ...appInitialProps };
};
