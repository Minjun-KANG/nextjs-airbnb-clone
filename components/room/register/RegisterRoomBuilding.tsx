import React, { useMemo } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Selector from "../../common/Selector";
import { largeBuildingTypeList } from "../../../lib/staticData";
import { useSelector } from "../../../store";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";

const disabledlargeBuildingTypeOptions = ["하나를 선택해주세요."];

const RegisterRoomBuilding: React.FC = () => {
	const largeBuildingType = useSelector(
		(state) => state.registerRoom.largeBuildingType
	);

	const dispatch = useDispatch();

	const onChagneLargeBuildingType = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
	};

	const detailBuildingOptions = useMemo(() => {
		switch (largeBuildingType) {
			case "아파트": {
				const {
					apartmentBuildingTypeList,
				} = require("../../../lib/staticData");
				dispatch(
					registerRoomActions.setBuildingType(apartmentBuildingTypeList[0])
				);
				return apartmentBuildingTypeList;
			}
			case "주택": {
				const { houstBuildingTypeList } = require("../../../lib/staticData");
				dispatch(registerRoomActions.setBuildingType(houstBuildingTypeList[0]));
				return houstBuildingTypeList;
			}
			case "별채": {
				const {
					secondaryUnitBuildingTypeList,
				} = require("../../../lib/staticData");
				dispatch(
					registerRoomActions.setBuildingType(secondaryUnitBuildingTypeList[0])
				);
				return secondaryUnitBuildingTypeList;
			}
			case "독특한 숙소": {
				const {
					uniqueSpaceBuildingTypeList,
				} = require("../../../lib/staticData");
				dispatch(
					registerRoomActions.setBuildingType(uniqueSpaceBuildingTypeList[0])
				);
				return uniqueSpaceBuildingTypeList;
			}
			case "B&B": {
				const { bnbBuildingTypeList } = require("../../../lib/staticData");
				dispatch(registerRoomActions.setBuildingType(bnbBuildingTypeList[0]));
				return bnbBuildingTypeList;
			}
			case "부티크호텔": {
				const {
					boutiquesHotelBuildingTypeList,
				} = require("../../../lib/staticData");
				dispatch(
					registerRoomActions.setBuildingType(boutiquesHotelBuildingTypeList[0])
				);
				return boutiquesHotelBuildingTypeList;
			}
			default:
				return ["아파트"];
		}
	}, [largeBuildingType]);

	const buildingType = useSelector((state) => state.registerRoom.buildingType);
	const onChangeBuildingType = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		dispatch(registerRoomActions.setBuildingType(event.target.value));
	};

	return (
		<Container>
			<h2>등록할 숙소 종류는 무엇인가요?</h2>
			<h3>1단계</h3>
			<div className="register-room-building-selector-wrapper">
				<Selector
					type="register"
					value={largeBuildingType || undefined}
					defaultValue="하나를 선택해주세요."
					disabledOptions={disabledlargeBuildingTypeOptions}
					label="우선 범위를 좁혀볼까요?"
					options={largeBuildingTypeList}
					onChange={onChagneLargeBuildingType}
				/>
			</div>
			<div className="register-room-building-selector-wrapper">
				<Selector
					type="register"
					value={buildingType || undefined}
					onChange={onChangeBuildingType}
					disabled={!largeBuildingType}
					label="건물 유형을 선택하세요."
					options={detailBuildingOptions}
				/>
			</div>
		</Container>
	);
};

export default RegisterRoomBuilding;

const Container = styled.div`
	padding: 62px 30px 100px;
	h2 {
		font-size: 19px;
		font-weight: 800;
		margin-bottom: 56px;
	}
	h3 {
		font-size: 14px;
		font-weight: bold;
		color: ${palette.gray_76};
		margin-bottom: 6px;
	}

	.register-room-building-selector-wrapper {
		width: 320px;
		margin-bottom: 32px;
	}
	.register-room-room-type-radio {
		max-width: 485px;
		margin-bottom: 50px;
	}
	.register-room-is-setup-for-guest-radio {
		margin-bottom: 50px;
	}
`;
