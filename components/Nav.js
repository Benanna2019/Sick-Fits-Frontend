import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { Menu } from "./styles/Menu";
import { useUser } from "./User";
import SignOut from "./SignOut";

export default function Nav() {
	// const [menuStatus, setMenuStatus] = useState();
	const user = useUser();

	return (
		<>
			{/* <Menu setStatus={setMenuStatus} /> */}
			<NavStyles>
				<Link href="/products">Products</Link>
				{user && (
					<>
						<Link href="/sell">Sell</Link>
						<Link href="/orders">Orders</Link>
						<Link href="/account">Account</Link>
						<SignOut />
					</>
				)}
				{!user && (
					<>
						<Link href="/signin">Sign In</Link>
					</>
				)}
			</NavStyles>
		</>
	);
}
