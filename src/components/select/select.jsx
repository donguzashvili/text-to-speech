import classes from "./select.module.css";

import { ReactComponent as Arrow } from "../../assets/icons/Vector.svg";
import { ReactComponent as GBFlag } from "../../assets/images/GB.svg";
import GeorgianFlag from "../../assets/images/georgia.png";
import { useEffect, useRef, useState } from "react";

const options = [
  { text: "English", lang: "en", Icon: GBFlag },
  { text: "ქართული", lang: "ka", Icon: null, image: GeorgianFlag },
];

const Select = () => {
  const menuRef = useRef(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ text: "Language", Icon: GBFlag, lang: "en" });

  const menuControl = (e) => {
    if (menuRef.current && openOptions && !menuRef.current.contains(e.target)) setOpenOptions(false);
  };

  useEffect(() => {
    //this is not cool approach we can do this with react portals but this is way faster to implement
    document.addEventListener("mousedown", menuControl);
    return () => {
      document.removeEventListener("mousedown", menuControl);
    };
  });

  return (
    <div className={classes.selectWrapper} ref={menuRef}>
      <div className={classes.currentValue} onClick={() => setOpenOptions(!openOptions)}>
        {selectedOption.Icon ? <selectedOption.Icon /> : <img src={selectedOption.image} alt="flag" />}
        <p>{selectedOption.text}</p> <Arrow className={classes.arrow} />
      </div>
      <div className={`${classes.options} ${openOptions && classes.open}`}>
        {options.map((el) => (
          <div onClick={() => setSelectedOption(el)}>
            {el.Icon ? <el.Icon /> : <img src={el.image} alt="flag" />} <p>{el.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
