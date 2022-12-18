import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from "react-redux";
import user from "./user";
import common from "./common";
import auth from "./auth";
import registerRoom from "./registerRoom";

const rootReducer = combineReducers({
	registerRoom: registerRoom.reducer,
	common: common.reducer,
	user: user.reducer,
	auth: auth.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		if (state === initialRootState) {
			return {
				...state,
				...action.payload,
			};
		}
		return state;
	}
	return rootReducer(state, action);
};

//타입 지원되는 커스텀 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const store = configureStore({
	reducer,
	devTools: true,
});

const initStore: MakeStore<any> = () => {
	initialRootState = store.getState();
	return store;
};

// export const wrapper = wrapper.useWrappedStore(initialR)
export const wrapper = createWrapper(initStore);
