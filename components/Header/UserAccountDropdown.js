import Link from "next/link";

function UserAccountDropdown({
  pathname,
  dropdawonOpen,
  profile,
  onClickLogout,
}) {
  return (
    <div
      className={
        dropdawonOpen ? "user_account_dropdown_active" : "user_account_dropdown"
      }
    >
      <ul>
        <Link href="/users/profile">
          <li
            className={pathname == "/users/profile" ? "active_link" : ""}
            style={{
              width: "100%",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              textTransform: "capitalize",
              /* textOverflow: "ellipsis", */
            }}
          >
            <small style={{ fontSize: ".7rem" }}>
              {" "}
              {profile && profile.fName
                ? profile.fName + " " + profile.lName
                : "User Name"}
            </small>
            <br />
            <b> {profile && profile.email ? profile.email : "Profile"} </b>
          </li>
        </Link>
        <Link href="/users/change-password">
          <li
            className={
              pathname == "/users/change-password" ? "active_link" : ""
            }
          >
            Change password
          </li>
        </Link>
        <Link href="/users/settings">
          <li className={pathname == "/users/settings" ? "active_link" : ""}>
            Notify me on post
          </li>
        </Link>
        <div className="divider"></div>
        <Link href="/users/add-product">
          <li className={pathname == "/users/add-product" ? "active_link" : ""}>
            Add Product
          </li>
        </Link>
        <Link href="/users/my-products">
          <li className={pathname == "/users/my-products" ? "active_link" : ""}>
            My Products
          </li>
        </Link>
        <div className="divider"></div>
        <Link href="/users/add-advert/0">
          <li
            className={
              pathname == "/users/add-advert/[aid]" ? "active_link" : ""
            }
          >
            Add Advert
          </li>
        </Link>
        <Link href="/users/my-adverts">
          <li className={pathname == "/users/my-adverts" ? "active_link" : ""}>
            My Adverts
          </li>
        </Link>
        <button className="btn-logout" onClick={onClickLogout}>
          Lock Account
        </button>
      </ul>
    </div>
  );
}

export default UserAccountDropdown;
