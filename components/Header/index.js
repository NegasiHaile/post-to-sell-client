import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Next tools
import Link from "next/link";
import { useRouter } from "next/router";

// Libraries
import useOnClickOutside from "use-onclickoutside";
import { toast } from "react-toastify";

// Redux
import { setProfile } from "../../store/actions/profileActions";

// Dev components
import Logo from "../../assets/icons/logo";
import { signOut } from "../../components/SignOut";
import UserAccountDropdown from "./UserAccountDropdown";

// APIs
import { api_getUserProfile } from "../../api";

const Header = ({ isErrorPage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [newNotifications, setNewNotifications] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const { profile } = useSelector((state) => {
    return { profile: state.profile.profile };
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

  useEffect(async () => {
    if (user) {
      const res = await api_getUserProfile(user?.accesstoken);
      dispatch(setProfile(res.data.profile));
    }
  }, [user]);

  useEffect(() => {
    const newNtfs = profile?.notifications.filter(
      (notification) => notification.status === "new"
    );
    setNewNotifications(newNtfs?.length);
  }, [profile]);

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
    localStorage.removeItem("auth");
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

  console.log(profile);
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

          {isUser ? (
            <>
              <Link href="/users/my-notifications">
                <button
                  className={`btn-cart ${
                    router.pathname == "/users/my-notifications"
                      ? "active_link"
                      : ""
                  }`}
                >
                  <i className="icon-cart"></i>
                  {newNotifications > 0 && (
                    <span className="btn-cart__count">{newNotifications}</span>
                  )}
                </button>
              </Link>
              <div>
                <button
                  className="site-header__btn-profile-avatar"
                  onClick={() => setDropdawonOpen(!dropdawonOpen)}
                >
                  <i className="icon-avatar"></i>
                </button>
              </div>
            </>
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
