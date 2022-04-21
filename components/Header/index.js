import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { signoutSuccess } from "../../store/actions/authActions";
import { toast } from "react-toastify";
import { signOut } from "../../components/SignOut";

import UserAccountDropdown from "./UserAccountDropdown";
const Header = ({ isErrorPage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile, user } = useSelector((state) => {
    return { profile: state.profile.profile, user: state.auth.user };
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
    signOut(dispatch);
    /* dispatch(signoutSuccess()); */
    toast.success("Signed out succefully!", {
      position: "top-right",
      theme: "colored",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
            <a className={router.pathname == "/products" ? "active_link" : ""}>
              Products
            </a>
          </Link>
          {isUser && (
            <>
              <Link href="/users/my-products">
                <a
                  className={
                    router.pathname == "/users/my-products" ? "active_link" : ""
                  }
                >
                  My Products
                </a>
              </Link>
              <Link href="/users/my-adverts">
                <a
                  className={
                    router.pathname == "/users/my-adverts" ? "active_link" : ""
                  }
                >
                  My Adverts
                </a>
              </Link>
            </>
          )}
          {/* <button className="site-nav__btn">
            <p>Account</p>
          </button> */}
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
                <button
                  className="site-header__btn-avatar"
                  style={{
                    backgroundColor: "#c22146",
                    padding: "3px 10px",
                    borderRadius: "3px",
                    color: "#fff",
                  }}
                >
                  {/* <i className="icon-avatar"></i> */}Login
                </button>
              </Link>
              {/* <Link href="/register">
                <button className="site-nav__btn">
                  Register
                </button>
              </Link> */}
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

      {user && (
        <UserAccountDropdown
          pathname={router.pathname}
          dropdawonOpen={dropdawonOpen}
          profile={profile}
          onClickLogout={onClickLogout}
        />
      )}
    </header>
  );
};

export default Header;
