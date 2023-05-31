import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// ** style imports
import classes from "./navigation.module.css";

// ** icon imports
import { ReactComponent as Arrow } from "../../assets/icons/VectorMenu.svg";
import { ReactComponent as Voice } from "../../assets/icons/music.svg";
import { ReactComponent as Camera } from "../../assets/icons/camera.svg";
import { ReactComponent as TopDecor } from "../../assets/icons/topVector.svg";
import { ReactComponent as BotDecor } from "../../assets/icons/botDecor.svg";
import { ReactComponent as Settings } from "../../assets/icons/settings.svg";
import { ReactComponent as Facebook } from "../../assets/icons/facebook.svg";
import { ReactComponent as QuestionMark } from "../../assets/icons/questionMark.svg";
import { ReactComponent as Sun } from "../../assets/icons/sun.svg";
import { ReactComponent as Moon } from "../../assets/icons/moon.svg";

function NavigationButton({ Icon, text, link, active }) {
  return (
    <Link to={link} className={active && classes.active}>
      {active && <TopDecor className={classes.decors} />}
      <Icon /> <p>{text}</p>
      {active && <BotDecor className={classes.decors} />}
    </Link>
  );
}

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case "/":
        return setActiveMenu(0);
      case "/text-to-speech":
        return setActiveMenu(1);
      case "/speech-to-text":
        return setActiveMenu(2);
      default:
        return setActiveMenu(0);
    }
  }, [pathname]);

  return (
    <div className={classes.navWrapper}>
      <nav className={classes.navigation}>
        <div className={classes.routingBtns}>
          <NavigationButton Icon={Arrow} text={"Spellchecker"} link={"/"} active={activeMenu === 0} />
          <NavigationButton Icon={Voice} text={"Text to speech"} link={"/text-to-speech"} active={activeMenu === 1} />
          <NavigationButton Icon={Camera} text={"Speech to text"} link={"/speech-to-text"} active={activeMenu === 2} />
        </div>
        <div className={classes.settingsWrapper}>
          <NavigationButton Icon={Settings} text={"Settings"} link={"/"} active={false} />
          <NavigationButton Icon={Facebook} text={"Facebook"} link={"/"} active={false} />
          <NavigationButton Icon={QuestionMark} text={"Contact support"} link={"/"} active={false} />
        </div>
        <div className={classes.colorMode}>
          <div>
            <Sun />
            <Moon />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
