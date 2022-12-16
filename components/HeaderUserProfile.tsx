import Link from "next/link";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import OutsideClickHandler from "react-outside-click-handler";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const HeaderUserProfile: React.FC = () => {
	const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
	const userProfileImage = useSelector(
		(state: RootState) => state.user.profileImage
	);
	const dispatch = useDispatch();

	const logout = async () => {
		try {
			await logoutAPI();
			dispatch(userActions.initUser());
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<OutsideClickHandler
			onOutsideClick={() => {
				if (isUsermenuOpened) {
					setIsUsermenuOpened(false);
				}
			}}
		>
			<button
				className="header-user-profile"
				type="button"
				onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
			>
				<HamburgerIcon />
				<img
					src={userProfileImage}
					className="header-user-profile-image"
					alt=""
				></img>
			</button>
			{isUsermenuOpened && (
				<ul className="header-usermenu">
					<li>숙소 관리</li>
					<Link
						href="/room/register/building"
						role="presentation"
						onClick={() => {
							setIsUsermenuOpened(false);
						}}
					>
						<li>숙소 등록하기</li>
					</Link>
					<div className="header-usermenu-divider" />
					<li role="presentation" onClick={logout}>
						로그아웃
					</li>
				</ul>
			)}
		</OutsideClickHandler>
	);
};

export default HeaderUserProfile;
