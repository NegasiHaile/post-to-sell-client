import Link from "next/link";

function UserAccountDropdown({ dropdawonOpen, onClickLogout }) {
  return (
    <div
      className={
        dropdawonOpen ? "user_account_dropdown_active" : "user_account_dropdown"
      }
    >
      <ul>
        <Link href="/users/profile">
          <li>Profile</li>
        </Link>
        <Link href="/users/settings">
          <li>Settings</li>
        </Link>
        <Link href="/users/change-password">
          <li>Change password</li>
        </Link>
        <div className="divider"></div>
        <Link href="/users/add-product">
          <li>Add Product</li>
        </Link>
        <Link href="/products">
          <li>My Products</li>
        </Link>
        <div className="divider"></div>
        <Link href="/users/add-advert/0">
          <li>Add Advert</li>
        </Link>
        <Link href="/users/my-adverts">
          <li>My Adverts</li>
        </Link>
        <button className="btn-logout" onClick={onClickLogout}>
          Lock Account
        </button>
      </ul>
    </div>
  );
}

export default UserAccountDropdown;
