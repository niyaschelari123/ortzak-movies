import { getStatusClassNames } from "antd/es/_util/statusUtils";
import React, { useState } from "react";
import classes from "./Nav.module.css";
import { SearchOutlined } from "@ant-design/icons";
import SignInModal from "./SignInModal/SignInModal";
import { Link, useLocation } from "react-router-dom";
import useWindowWidth from "./useWindowWidth";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

const navigations = [
  { name: "Home", icon: "/img/icons/home-icon.png", link: "/" },
  { name: "Movies", icon: "/img/icons/movies-icon.png", link: "/movies" },
  { name: "Tv Shows", icon: "/img/icons/series-icon.png", link: "/tv-shows" },
  { name: "Anime", icon: "/img/icons/anime-icon.png", link: "/anime" },
  { name: "Search", icon: "/img/search.png", link: "/search" },
  { name: "Add Show", icon: "/img/icons/add-show-icon.png", link: "/add-show" },
  { name: "Wishlist", icon: "/img/icons/wishlist-icon.png", link: "/wishlist" },
  { name: "Add to Wishlist", icon: "/img/icons/wishlist-add-icon.png", link: "/wishlist-add" },
  { name: "Profile", icon: "/img/icons/profile-icon.png", link: "/profile" },
];

function Nav() {
  const [visible, setVisible] = useState(false);
  const [reRender, setReRender] = useState(false);
  const location = useLocation();
  const [menuShow, setMenuShow] = useState(false);

  const width = useWindowWidth();

  const history = useHistory();

  console.log("location pathname", location.pathname);

  const user = localStorage.getItem("movielist_name");

  const handleLogout = () => {
    localStorage.removeItem("movielist_name");
    localStorage.removeItem("movielist_auth_type");
    localStorage.removeItem("movielist_email");
    setReRender(!reRender);
  };

  return (
    <>
      <div className={classes.bannerOuter}>
        {width > 900 && (
          <div className={classes.bannerLeft}>
            <Link style={{ textDecoration: "none" }} to="/">
              <h3
                className={`${
                  location.pathname == "/"
                    ? classes.navSelected
                    : classes.navText
                }`}
              >
                HOME
              </h3>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`${user ? "/tv-shows" : "/"}`}
            >
              <h3
                onClick={() => {
                  if (!user) {
                    setVisible(true);
                  }
                }}
                className={`${
                  location.pathname == "/tv-shows"
                    ? classes.navSelected
                    : classes.navText
                }`}
              >
                TV SHOWS
              </h3>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`${user ? "/movies" : "/"}`}
            >
              <h3
                onClick={() => {
                  if (!user) {
                    setVisible(true);
                  }
                }}
                className={`${
                  location.pathname == "/movies"
                    ? classes.navSelected
                    : classes.navText
                }`}
              >
                MOVIES
              </h3>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`${user ? "/anime" : "/"}`}
            >
              <h3
                onClick={() => {
                  if (!user) {
                    setVisible(true);
                  }
                }}
                className={`${
                  location.pathname == "/anime"
                    ? classes.navSelected
                    : classes.navText
                }`}
              >
                ANIME
              </h3>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`${user ? "/documentary" : "/"}`}
            >
              <h3
                onClick={() => {
                  if (!user) {
                    setVisible(true);
                  }
                }}
                className={`${
                  location.pathname == "/documentary"
                    ? classes.navSelected
                    : classes.navText
                }`}
              >
                DOCUMENTARY
              </h3>
            </Link>
          </div>
        )}
        {width > 900 && (
          <div className={classes.bannerRight}>
            {/* <div className={classes.searchbar}>
            <SearchOutlined
              style={{ color: "white", cursor: "pointer", fontSize: "24px" }}
            />
            <input type="text" />
          </div> */}
            <Link
              style={{ textDecoration: "none" }}
              to={`${user ? "/wishlist" : "/"}`}
            >
              <h3
                onClick={() => {
                  if (!user) {
                    setVisible(true);
                  }
                }}
                className={`${
                  location.pathname == "/wishlist"
                    ? classes.wishListSelected
                    : classes.wishList
                }`}
              >
                WISHLIST
              </h3>
            </Link>

            {user ? (
              <div className={classes.userIcon}>
                <Link style={{ textDecoration: "none" }} to="/profile">
                  <img src="/img/user-icon.png" />
                </Link>
                <Link style={{ textDecoration: "none" }} to="/profile">
                  <p>{user}</p>
                </Link>
                <div className={classes.logOutComponents}>
                  <Link style={{ textDecoration: "none" }} to="/add-show">
                    <p>Add Show</p>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/wishlist-add">
                    <p>Add to Wishlist</p>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/watch-history">
                    <p>Watch History</p>
                  </Link>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              </div>
            ) : (
              <div
                className={classes.signInButton}
                onClick={() => setVisible(true)}
              >
                Sign In
              </div>
            )}
          </div>
        )}
        {width < 900 && (
          <div className={classes.burgerOuter}>
            <img
              src="/img/icons/three-line-icon.png"
              onClick={() => setMenuShow(!menuShow)}
            />
            <div
              className={`${
                menuShow ? classes.slideMenuShow : classes.slideMenu
              }`}
            >
              <div className={classes.closeDiv}>
                <img
                  onClick={() => setMenuShow(!menuShow)}
                  src="/img/icons/close-icon.png"
                />
              </div>
              <div className={classes.navigation}>
                {navigations.map((item) => (
                  <div className={classes.menuIndividual}>
                    <Link to={user ? item.link : "/"}>
                      <img
                        onClick={() => {
                          if (user) {
                            setMenuShow(!menuShow);
                          } else {
                            setVisible(true);
                          }
                        }}
                        src={item.icon}
                      />
                    </Link>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={user ? item.link : "/"}
                    >
                      <p
                        onClick={() => {
                          if (user) {
                            setMenuShow(!menuShow);
                          } else {
                            setVisible(true);
                          }
                        }}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
              <div className={classes.profileComponent}>
                {user ? (
                  <div className={classes.profileDiv}>
                    <img src="/img/icons/profile-image.png" />
                    <p>{user}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className={classes.logOutDiv}>
                  {user ? (
                    <Button
                      className={classes.logOutButton}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      className={classes.logOutButton}
                      onClick={() => setVisible(true)}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SignInModal
        visible={visible}
        setVisible={setVisible}
        setMenuShow={setMenuShow}
        menuShow={menuShow}
      />
    </>
  );
}

export default Nav;
