import classes from "./header.module.css";
import chromeLogo from "../../assets/images/chrome.png";
import avatar from "../../assets/images/avatar.png";
import { ReactComponent as Arrow } from "../../assets/icons/Vector.svg";
import Button from "../button/button";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.btns}>
        <button>
          <img src={chromeLogo} alt="chrome logo" />
          <p>Add to Chrome</p>
        </button>
        <Button text={"Upgrade to Pro"} />
      </div>
      <div className={classes.avatar}>
        <img src={avatar} alt="avatar" />
        <Arrow />
      </div>
    </div>
  );
};

export default Header;
