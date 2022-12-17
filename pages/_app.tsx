import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import { Provider } from "react-redux";
// import { store } from "../store";

const myApp = ({ Component, pageProps }: AppProps) => {
	// const { store, props } = wrapper.useWrappedStore(pageProps);
	return (
		<>
			<GlobalStyle></GlobalStyle>
			<Header></Header>
			<Component {...pageProps}></Component>
			<div id="root-modal"></div>
		</>
	);
};
// <Provider store={store}>
// </Provider>
export default wrapper.withRedux(myApp);
// export default myApp;

// second try - using page Component
myApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
	// console.log("app initProps");
	let pageProps = {};
	// 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	const cookieObject = cookieStringToObject(ctx.req?.headers.cookie);
	const { store } = ctx;
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

	// _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
	pageProps = { ...pageProps };

	return { pageProps };
};

//first try - same book

// myApp.getInitialProps = async (context: AppContext) => {
// 	const appInitialProps = await App.getInitialProps(context);
// 	const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
// 	const { store } = context.ctx;
// 	const { isLogged } = store.getState().user;
// 	try {
// 		if (!isLogged && cookieObject.access_token) {
// 			axios.defaults.headers.cookie = cookieObject.access_token;
// 			const { data } = await meAPI();
// 			store.dispatch(userActions.setLoggedUser(data));
// 		}
// 	} catch (e) {
// 		console.log(e);
// 	}
// 	return { ...appInitialProps };
// };
