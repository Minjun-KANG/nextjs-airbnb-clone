import React, { FC } from "react";
import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
// import axios from "../lib/api";
import axios from "axios";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import { Provider } from "react-redux";

const myApp = ({ Component, ...rest }: AppProps) => {
	const { store, props } = wrapper.useWrappedStore(rest);
	return (
		<Provider store={store}>
			<GlobalStyle></GlobalStyle>
			<Header></Header>
			<Component {...props.pageProps} />
			<div id="root-modal"></div>
		</Provider>
	);
};
// FC<AppProps> Type

/*
// const myApp: FC<AppProps> = ({ Component, ...rest }) => {
// 	const { store, props } = wrapper.useWrappedStore(rest);
// 	// const { store, props } = wrapper.useWrappedStore(pageProps);
// 	return (
// 		<Provider store={store}>
// 			<>
// 				<Component {...pageProps}></Component>

// 				{console.log("App")}
// 			</>
// 		</Provider>
// 	);
// };
//
//
// export default wrapper.withRedux(myApp);
*/

export default myApp;
// second try - using page Component
// myApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
// 	console.log("app initProps");
// 	let pageProps = {};
// 	// 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
// 	if (Component.getInitialProps) {
// 		pageProps = await Component.getInitialProps(ctx);
// 	}
// 	// const appInitialProps = await App.getInitialProps(ctx);
// 	const cookieObject = cookieStringToObject(ctx.req?.headers.cookie);
// 	const { store } = ctx;
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

// 	// _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
// 	pageProps = { ...pageProps };

// 	return { pageProps };
// };

//first try - same book

myApp.getInitialProps = wrapper.getInitialAppProps(
	() => async (context: AppContext) => {
		// console.log("Initital Props-1");
		const appInitialProps = await App.getInitialProps(context);
		// console.log("Initital Props-2");
		const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
		// console.log("Initital Props-3");
		const { store } = context.ctx;
		// console.log("Initital Props-4" + store);
		const { isLogged } = store.getState().user;
		// console.log("Initital Props-5" + isLogged);

		// export default axios;
		try {
			// console.log("Initital Props-6");
			if (!isLogged && cookieObject.access_token) {
				// console.log("Initital Props-7");
				// console.log(cookieObject.access_token);
				axios.defaults.headers.cookie = cookieObject.access_token;
				// console.log("Initital Props-8");
				const { data } = await meAPI();
				// console.log("Initital Props-9");
				store.dispatch(userActions.setLoggedUser(data));
				// console.log("Initital Props-10");
			}
		} catch (e) {
			console.log(e);
		}
		return { ...appInitialProps };
	}
);
