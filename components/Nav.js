import Link from "next/link";
import { useUser } from "./User";
import SignOut from "./SignOut";
import NavStyles from "../components/styles/NavStyles";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <>
      <NavStyles>
        <Link href="/products">Products</Link>
        {user && (
          <>
            <Link href="/sell">Sell</Link>
            <Link href="/order">Order</Link>
            <Link href="/reset">Reset</Link>
            <SignOut />
            <button type="button" onClick={openCart}>
              My Cart
              <CartCount
                count={user.cart.reduce(
                  (tally, cartItem) =>
                    tally + (cartItem.product ? cartItem.quantity : 0),
                  0
                )}
              />
            </button>
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
