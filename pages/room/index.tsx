import React from "react";
import { GetServerSideProps, NextPage } from "next";
import RoomMain from "../../components/room/main/RoomMain";
import { getRoomListAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import { wrapper } from "../../store";
import { Context } from "next-redux-wrapper";

const index: NextPage = () => {
	return <RoomMain></RoomMain>;
};

export default index;

//https://mr-son.tistory.com/130
export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (context) => {
		// console.log("---------------" + context.query.checkInDate);
		// console.log("-----------" + );
		const { query } = context;
		const {
			checkInDate,
			checkOutDate,
			adultCount,
			childrenCount,
			latitude,
			longitude,
			limit,
			page = "1",
		} = query;
		try {
			const { data } = await getRoomListAPI({
				checkInDate,
				checkOutDate,
				adultCount,
				childrenCount,
				latitude,
				longitude,
				limit: limit || "20",
				page: page || "1",
				//? 한글은 encode해주세요.
				location: query.location
					? encodeURI(query.location as string)
					: undefined,
			});
			store.dispatch(roomActions.setRooms(data));
		} catch (e) {
			console.log(e);
		}
		return {
			props: {}, // will be passed to the page component as props
		};
	});
/* book - do not use InitProps - old version
index.getInitialProps = async ({ store, query }) => {
	console.log(query);
	const {
		checkInDate,
		checkOutDate,
		adultCount,
		childrenCount,
		latitude,
		longitude,
		limit,
		page = "1",
	} = query;
	try {
		const { data } = await getRoomListAPI({
			checkInDate,
			checkOutDate,
			adultCount,
			childrenCount,
			latitude,
			longitude,
			limit: limit || "20",
			page: page || "1",
			//? 한글은 encode해주세요.
			location: query.location
				? encodeURI(query.location as string)
				: undefined,
		});
		store.dispatch(roomActions.setRooms(data));
	} catch (e) {
		console.log(e);
	}

	return {};
};
*/
