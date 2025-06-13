import Styles from "./SideBar.module.css";
import no_avatar from "../../assets/no_avatar.png";

import { FaRegUserCircle, FaFireAlt, FaHistory } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { PiSignInBold } from "react-icons/pi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "../../features/auth/auth";
import { toggleTheme } from "../../features/theme/theme";

export const SideBar = () => {
  const dispatch = useDispatch();
  const [isShort, setIsShort] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const theme = useSelector((state: RootState) => state.theme.currentTheme);
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state: RootState) => state.auth.currentUser);

  const toggleSideBar = () => {
    setIsShort(!isShort);
  };

  const getLogoPath = (isShort: boolean) => {
    if (theme === "dark") {
      return isShort ? "/img/logo_vc_short.svg" : "/img/logo_vc_long.svg";
    } else {
      return isShort ? "/img/logo_vc_short.svg" : "/img/logo_vc_long.svg";
    }
  };

  const onHandleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className={`${Styles.aside} ${isShort ? Styles.aside_short : ""}`}>
      <nav className={Styles.nav__aside}>
        <div className={Styles.sidebar__header}>
          <Link
            to={"/"}
            className={Styles.nav_logo__item}
            onClick={toggleSideBar}
          >
            <img
              src={getLogoPath(isShort)}
              alt="logo"
              className={isShort ? Styles.logo_short : Styles.logo}
              onMouseEnter={() => setIsHidden(true)}
              onMouseLeave={() => setIsHidden(false)}
            />
          </Link>
          <button
            onClick={toggleSideBar}
            className={`${Styles.collapse__button} ${
              !isHidden ? Styles.hidden__logo : ""
            }`}
            data-theme={theme}
          >
            {isShort ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
          </button>
        </div>

        <div className={Styles.nav__items}>
          <Link to={"/"} className={Styles.nav__item} data-theme={theme}>
            <FaFireAlt size={22} />
            {!isShort && <span>Главная</span>}
          </Link>
          <Link to={"/users"} className={Styles.nav__item} data-theme={theme}>
            <FaRegUserCircle size={22} />
            {!isShort && <span>Пользователи</span>}
          </Link>
          <Link to={`/videos`} className={Styles.nav__item} data-theme={theme}>
            <RiPlayList2Fill size={22} />
            {!isShort && <span>Все видео</span>}
          </Link>
          {isAuth ? (
            <div
              className={Styles["nav_item_user_info"]}
              data-theme={theme}
              ref={buttonRef}
              onClick={() => {
                if (isShort) {
                  setShowPopup(true);
                } else {
                  setShowPopup((prev) => !prev);
                }
              }}
            >
              <img
                src={
                  user?.avatar
                    ? `http://localhost:3333${user?.avatar}`
                    : no_avatar
                }
                className={Styles["user_avatar"]}
                alt=""
              />
              {!isShort && (
                <div className={Styles["user_text-info"]}>
                  <span className={Styles["user_login"]} data-theme={theme}>
                    {user?.login}
                  </span>
                </div>
              )}
              {(showPopup || (isShort && showPopup)) && (
                <div
                  ref={popupRef}
                  className={`${Styles["user_popup"]} ${
                    isShort ? Styles["user_popup_short"] : ""
                  }`}
                  data-theme={theme}
                >
                  {isAuth && (
                    <button
                      className={Styles["user_btn_logout"]}
                      data-theme={theme}
                      onClick={onHandleLogout}
                    >
                      <span>Выйти</span>
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className={Styles["user_data"]}
                    data-theme={theme}
                  >
                    Тема: {theme === "light" ? "Светалая" : "Темная"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className={Styles.nav__item_sign}
              data-theme={theme}
            >
              <PiSignInBold size={24} />
              {!isShort && <span>Войти</span>}
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
};
