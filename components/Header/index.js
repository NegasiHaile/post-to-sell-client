import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { signoutSuccess } from "../../store/actions/authActions";

const Header = ({ isErrorPage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems, user } = useSelector((state) => {
    return { cartItems: state.cart, user: state.auth.user };
  });
  const [dropdawonOpen, setDropdawonOpen] = useState(false);
  const isUser = user && user.role === "user";
  const arrayPaths = ["/"];
  console.log("auth", isUser);
  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  const onClickLogout = () => {
    dispatch(signoutSuccess());
    router.push("/login");
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <a>
            <h1 className="site-logo">
              <Logo />
              Post-To-Sell
            </h1>
          </a>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">
            <a>Products</a>
          </Link>
          {isUser && (
            <>
              <Link href="/users/my-products">
                <a>My Products</a>
              </Link>
              <Link href="/users/add-product">
                <a>Add Product</a>
              </Link>
            </>
          )}
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? "search-form--active" : ""
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button>
          {/* <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link> */}
          {isUser ? (
            <div>
              <button
                className="site-header__btn-profile-avatar"
                onClick={() => setDropdawonOpen(!dropdawonOpen)}
              >
                <i className="icon-avatar"></i>
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="site-header__btn-avatar">
                  {/* <i className="icon-avatar"></i> */}Login
                </button>
              </Link>
              <Link href="/register">
                <button className="site-header__btn-avatar">
                  {/* <i className="icon-avatar"></i> */}Register
                </button>
              </Link>
            </>
          )}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
      <div
        className={
          dropdawonOpen
            ? "user_account_dropdown_active"
            : "user_account_dropdown"
        }
      >
        <ul>
          <Link href="/products">
            <li>Profile</li>
          </Link>
          <Link href="/products">
            <li>Settings</li>
          </Link>
          <Link href="/products">
            <li>Change password</li>
          </Link>
          <div className="divider"></div>
          <Link href="/users/add-product">
            <li>Add Product</li>
          </Link>
          <Link href="/users/my-products">
            <li>My Products</li>
          </Link>
          <div className="divider"></div>
          <li onClick={onClickLogout}>Lock Account </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
