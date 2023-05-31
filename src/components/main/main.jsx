import React from "react";
import Header from "../header/header";
import Navigation from "../navigation/navigation";
import Routing from "../../routing/Routing";

import classes from "./main.module.css";

const Main = () => {
  return (
    <div className={classes.mainWrapper}>
      <Header />
      <div className={classes.mainContent}>
        <Navigation />
        <div className={classes.mainComponentWrapper}>
          <Routing />
        </div>
      </div>
    </div>
  );
};

export default Main;
